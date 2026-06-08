/**
 * Minimal in-memory fixed-window rate limiter, keyed by IP + bucket name.
 * NOTE: per-process only — fine for a single instance / dev. For multi-instance
 * production, swap the Map for Redis (same interface).
 */
type Entry = { count: number; resetAt: number };
const store = new Map<string, Entry>();

export function rateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number },
): { ok: boolean; retryAfter: number } {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now >= entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfter: 0 };
  }

  entry.count += 1;
  if (entry.count > limit) {
    return { ok: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }
  return { ok: true, retryAfter: 0 };
}

/** Best-effort client IP from proxy headers (Vercel / nginx) with fallback. */
export function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

// Opportunistic cleanup so the Map can't grow unbounded.
if (typeof setInterval !== "undefined") {
  const timer = setInterval(() => {
    const now = Date.now();
    for (const [k, v] of store) if (now >= v.resetAt) store.delete(k);
  }, 60_000);
  // Don't keep the event loop alive just for cleanup.
  (timer as { unref?: () => void }).unref?.();
}
