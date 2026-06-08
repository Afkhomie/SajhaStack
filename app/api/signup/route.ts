import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db, ensureSchema } from "@/lib/db";
import { validName, validEmail, validPassword } from "@/lib/validation";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export async function POST(req: Request) {
  // Throttle account creation: 5 / 15 min / IP.
  const rl = rateLimit(`signup:${clientIp(req)}`, {
    limit: 5,
    windowMs: 900_000,
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

  const { name, email, password } = (body ?? {}) as Record<string, unknown>;

  const cleanName = validName(name);
  const cleanEmail = validEmail(email);
  const cleanPassword = validPassword(password);

  if (!cleanName) {
    return NextResponse.json(
      { error: "Please enter your full name." },
      { status: 400 },
    );
  }
  if (!cleanEmail) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }
  if (!cleanPassword) {
    return NextResponse.json(
      { error: "Password must be at least 8 characters." },
      { status: 400 },
    );
  }

  try {
    await ensureSchema();
    const hash = await bcrypt.hash(cleanPassword, 12);
    await db.query(
      `INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3)`,
      [cleanName, cleanEmail, hash],
    );
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err: unknown) {
    if ((err as { code?: string })?.code === "23505") {
      // Generic message — don't confirm whether an email is registered.
      return NextResponse.json(
        { error: "Could not create account with those details." },
        { status: 409 },
      );
    }
    console.error("signup failed:", err);
    return NextResponse.json(
      { error: "Something went wrong on our side. Please try again." },
      { status: 500 },
    );
  }
}
