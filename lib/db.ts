import { Pool } from "pg"

const globalForDb = globalThis as unknown as {
  pool: Pool
}

function createPool() {
  return new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 20,
  })
}

export const pool = globalForDb.pool || createPool()

if (process.env.NODE_ENV !== "production") globalForDb.pool = pool

/** Initialize the database schema (idempotent) */
export async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS "Vote" (
      id SERIAL PRIMARY KEY,
      "fightId" INTEGER NOT NULL,
      fighter TEXT NOT NULL,
      "voterId" TEXT NOT NULL,
      "ipAddress" TEXT NOT NULL,
      "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      UNIQUE("fightId", "voterId"),
      UNIQUE("fightId", "ipAddress")
    )
  `)
}
