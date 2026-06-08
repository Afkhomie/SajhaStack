/** Shared input validation + sanitization for public API routes. */

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// GitHub username rules: alphanumeric or single hyphens, max 39 chars.
const GITHUB_RE = /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/;

const INTERESTS = new Set([
  "web",
  "mobile",
  "ai",
  "devops",
  "blockchain",
  "opensource",
  "other",
]);

/** Strip control characters (incl. log/CRLF-injection chars) and trim. */
export function clean(value: unknown, maxLen = 200): string {
  if (typeof value !== "string") return "";
  // eslint-disable-next-line no-control-regex
  return value
    .replace(/[\x00-\x1F\x7F]/g, "")
    .trim()
    .slice(0, maxLen);
}

export function validName(value: unknown): string | null {
  const name = clean(value, 100);
  // Letters (incl. unicode), spaces, hyphen, apostrophe, dot.
  if (name.length < 2 || name.length > 100) return null;
  if (!/^[\p{L}\p{M} '.-]+$/u.test(name)) return null;
  return name;
}

export function validEmail(value: unknown): string | null {
  const email = clean(value, 254).toLowerCase();
  if (!EMAIL_RE.test(email) || email.length > 254) return null;
  return email;
}

/** Returns sanitized github username, or null if provided-but-invalid. */
export function validGithub(value: unknown): string | null | undefined {
  const gh = clean(value, 80)
    .replace(/^@/, "")
    .replace(/^https?:\/\/(www\.)?github\.com\//i, "");
  if (!gh) return undefined; // optional, empty is fine
  return GITHUB_RE.test(gh) ? gh : null;
}

export function validInterest(value: unknown): string | undefined {
  const v = clean(value, 50);
  return INTERESTS.has(v) ? v : undefined;
}

/** Server-side password policy (mirrors the client minLength but authoritative). */
export function validPassword(value: unknown): string | null {
  if (typeof value !== "string") return null;
  if (value.length < 8 || value.length > 200) return null;
  return value;
}
