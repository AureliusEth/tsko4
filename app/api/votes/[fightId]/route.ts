import { NextRequest, NextResponse } from "next/server"
import { pool, initDb } from "@/lib/db"
import { getVoterId } from "@/lib/voter"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ fightId: string }> }
) {
  try {
    await initDb()

    const { fightId: fightIdStr } = await params
    const fightId = parseInt(fightIdStr, 10)

    if (isNaN(fightId)) {
      return NextResponse.json(
        { error: "Invalid fightId" },
        { status: 400 }
      )
    }

    // Get all votes for this fight grouped by fighter
    const result = await pool.query(
      'SELECT fighter, COUNT(*)::int as count FROM "Vote" WHERE "fightId" = $1 GROUP BY fighter',
      [fightId]
    )

    const counts: Record<string, number> = {}
    let total = 0
    for (const row of result.rows) {
      const count = Number(row.count)
      counts[row.fighter as string] = count
      total += count
    }

    // Check if current user already voted
    const voterId = await getVoterId()
    let userVote: string | null = null

    if (voterId) {
      const existing = await pool.query(
        'SELECT fighter FROM "Vote" WHERE "fightId" = $1 AND "voterId" = $2',
        [fightId, voterId]
      )
      if (existing.rows.length > 0) {
        userVote = existing.rows[0].fighter as string
      }
    }

    // Cache vote counts for 2 seconds — prevents stampede during live voting
    // while keeping results near real-time
    const response = NextResponse.json({ counts, userVote, total })
    response.headers.set("Cache-Control", "public, s-maxage=2, stale-while-revalidate=5")
    return response
  } catch (error) {
    console.error("Get votes error:", error)
    return NextResponse.json(
      { error: "Failed to get votes" },
      { status: 500 }
    )
  }
}
