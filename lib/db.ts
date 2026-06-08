import { Pool } from "pg";

/**
 * Postgres connection pool (singleton across hot reloads in dev).
 * Configure via DATABASE_URL, e.g.
 *   postgres://sajha:sajha@localhost:5432/sajhastack
 */
const globalForDb = globalThis as unknown as { pgPool?: Pool };

export const db =
  globalForDb.pgPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10,
  });

if (process.env.NODE_ENV !== "production") globalForDb.pgPool = db;

let schemaReady: Promise<void> | null = null;

/** Idempotent schema bootstrap — keeps "simple backend" zero-migration. */
export function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = (async () => {
      await db.query(
        `CREATE TABLE IF NOT EXISTS registrations (
           id         SERIAL PRIMARY KEY,
           name       TEXT NOT NULL,
           email      TEXT NOT NULL UNIQUE,
           github     TEXT,
           interest   TEXT,
           created_at TIMESTAMPTZ NOT NULL DEFAULT now()
         )`,
      );
      // Accounts for credential sign-in. Passwords are stored ONLY as bcrypt
      // hashes — never plaintext.
      await db.query(
        `CREATE TABLE IF NOT EXISTS users (
           id            SERIAL PRIMARY KEY,
           name          TEXT NOT NULL,
           email         TEXT NOT NULL UNIQUE,
           password_hash TEXT NOT NULL,
           created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
         )`,
      );
    })().catch((err) => {
      schemaReady = null; // allow retry on next request
      throw err;
    });
  }
  return schemaReady;
}
