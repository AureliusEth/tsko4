import { NextRequest, NextResponse } from "next/server"
import { pool, initDb } from "@/lib/db"
import { getVoterId, createAndSetVoterId } from "@/lib/voter"

export async function POST(request: NextRequest) {
  try {
    await initDb()

    const body = await request.json()
    const { fightId, fighter } = body as { fightId: number; fighter: string }

    if (!fightId || !fighter) {
      return NextResponse.json(
        { error: "fightId and fighter are required" },
        { status: 400 }
      )
    }

    // Get or create voter identity
    let voterId = await getVoterId()
    if (!voterId) {
      voterId = await createAndSetVoterId()
    }

    // Get IP address from headers
    const forwarded = request.headers.get("x-forwarded-for")
    const ipAddress = forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "127.0.0.1"

    // Single atomic query: try to insert, return existing vote if duplicate
    const result = await pool.query(
      `INSERT INTO "Vote" ("fightId", fighter, "voterId", "ipAddress")
       VALUES ($1, $2, $3, $4)
       ON CONFLICT ("fightId", "voterId") DO NOTHING
       RETURNING fighter`,
      [fightId, fighter, voterId, ipAddress]
    )

    // If insert succeeded, we get a row back
    if (result.rows.length > 0) {
      return NextResponse.json({ success: true, fighter })
    }

    // If no row returned, voter already voted — check what they voted for
    const existing = await pool.query(
      'SELECT fighter FROM "Vote" WHERE "fightId" = $1 AND ("voterId" = $2 OR "ipAddress" = $3) LIMIT 1',
      [fightId, voterId, ipAddress]
    )

    return NextResponse.json(
      { error: "already_voted", vote: existing.rows[0]?.fighter },
      { status: 409 }
    )
  } catch (error: any) {
    // Handle IP uniqueness constraint violation
    if (error?.code === "23505") {
      return NextResponse.json(
        { error: "already_voted" },
        { status: 409 }
      )
    }
    console.error("Vote error:", error)
    return NextResponse.json(
      { error: "Failed to cast vote" },
      { status: 500 }
    )
  }
}
