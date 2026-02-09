import { createHmac, randomUUID } from "crypto"
import { cookies } from "next/headers"

const COOKIE_NAME = "voter_id"

function getSecret(): string {
  const secret = process.env.COOKIE_SECRET
  if (!secret) throw new Error("COOKIE_SECRET env variable is required")
  return secret
}

/** Sign a value with HMAC-SHA256 */
function sign(value: string): string {
  const sig = createHmac("sha256", getSecret()).update(value).digest("hex")
  return `${value}.${sig}`
}

/** Verify and extract the value from a signed string. Returns null if invalid. */
function unsign(signed: string): string | null {
  const idx = signed.lastIndexOf(".")
  if (idx === -1) return null
  const value = signed.slice(0, idx)
  const expected = sign(value)
  if (expected !== signed) return null
  return value
}

/**
 * Read the voter ID from the signed cookie.
 * Returns the UUID string or null if no valid cookie exists.
 */
export async function getVoterId(): Promise<string | null> {
  const cookieStore = await cookies()
  const raw = cookieStore.get(COOKIE_NAME)?.value
  if (!raw) return null
  return unsign(raw)
}

/**
 * Create a new voter ID and set the signed cookie directly via Next.js cookies API.
 * Returns the new voter ID.
 */
export async function createAndSetVoterId(): Promise<string> {
  const voterId = randomUUID()
  const signed = sign(voterId)
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, signed, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 365, // 1 year
  })
  return voterId
}
