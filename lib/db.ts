import { createClient } from "@libsql/client"
import path from "path"

const globalForDb = globalThis as unknown as {
  db: ReturnType<typeof createClient>
}

function createDb() {
  const dbPath = path.join(process.cwd(), "prisma", "dev.db")
  return createClient({ url: `file:${dbPath}` })
}

export const db = globalForDb.db || createDb()

if (process.env.NODE_ENV !== "production") globalForDb.db = db

/** Initialize the database schema (idempotent) */
export async function initDb() {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS Vote (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fightId INTEGER NOT NULL,
      fighter TEXT NOT NULL,
      voterId TEXT NOT NULL,
      ipAddress TEXT NOT NULL,
      createdAt TEXT NOT NULL DEFAULT (datetime('now')),
      UNIQUE(fightId, voterId),
      UNIQUE(fightId, ipAddress)
    )
  `)
}
