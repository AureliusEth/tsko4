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

    // Get or create voter identity (cookie is set automatically via Next.js cookies API)
    let voterId = await getVoterId()
    if (!voterId) {
      voterId = await createAndSetVoterId()
    }

    // Get IP address from headers
    const forwarded = request.headers.get("x-forwarded-for")
    const ipAddress = forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "127.0.0.1"

    // Check if this voter already voted on this fight
    const existingByVoter = await pool.query(
      'SELECT fighter FROM "Vote" WHERE "fightId" = $1 AND "voterId" = $2',
      [fightId, voterId]
    )

    if (existingByVoter.rows.length > 0) {
      return NextResponse.json(
        { error: "already_voted", vote: existingByVoter.rows[0].fighter },
        { status: 409 }
      )
    }

    // Check if this IP already voted on this fight
    const existingByIp = await pool.query(
      'SELECT fighter FROM "Vote" WHERE "fightId" = $1 AND "ipAddress" = $2',
      [fightId, ipAddress]
    )

    if (existingByIp.rows.length > 0) {
      return NextResponse.json(
        { error: "already_voted", vote: existingByIp.rows[0].fighter },
        { status: 409 }
      )
    }

    // Cast the vote
    await pool.query(
      'INSERT INTO "Vote" ("fightId", fighter, "voterId", "ipAddress") VALUES ($1, $2, $3, $4)',
      [fightId, fighter, voterId, ipAddress]
    )

    return NextResponse.json({ success: true, fighter })
  } catch (error) {
    console.error("Vote error:", error)
    return NextResponse.json(
      { error: "Failed to cast vote" },
      { status: 500 }
    )
  }
}
