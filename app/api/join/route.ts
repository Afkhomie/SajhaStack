import { NextResponse } from "next/server";
import { db, ensureSchema } from "@/lib/db";
import {
  validName,
  validEmail,
  validGithub,
  validInterest,
} from "@/lib/validation";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export async function POST(req: Request) {
  // Throttle: 5 registrations / 10 min / IP.
  const rl = rateLimit(`join:${clientIp(req)}`, {
    limit: 5,
    windowMs: 600_000,
  });
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Too many attempts. Please try again later." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { name, email, github, interest } = (body ?? {}) as Record<
    string,
    unknown
  >;

  const cleanName = validName(name);
  if (!cleanName) {
    return NextResponse.json(
      { error: "Please enter your full name." },
      { status: 400 },
    );
  }

  const cleanEmail = validEmail(email);
  if (!cleanEmail) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const cleanGithub = validGithub(github);
  if (cleanGithub === null) {
    return NextResponse.json(
      { error: "That GitHub username doesn't look right." },
      { status: 400 },
    );
  }

  const cleanInterest = validInterest(interest);

  try {
    await ensureSchema();
    await db.query(
      `INSERT INTO registrations (name, email, github, interest)
       VALUES ($1, $2, $3, $4)`,
      [cleanName, cleanEmail, cleanGithub ?? null, cleanInterest ?? null],
    );
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err: unknown) {
    // 23505 = unique_violation → already registered. Treat as success so
    // returning members still get the welcome popup (no account enumeration).
    if ((err as { code?: string })?.code === "23505") {
      return NextResponse.json({ ok: true, already: true }, { status: 200 });
    }
    console.error("join registration failed:", err);
    return NextResponse.json(
      { error: "Something went wrong on our side. Please try again." },
      { status: 500 },
    );
  }
}
