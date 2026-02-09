import { NextRequest, NextResponse } from "next/server"
import { db, initDb } from "@/lib/db"
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
    const result = await db.execute({
      sql: "SELECT fighter, COUNT(*) as count FROM Vote WHERE fightId = ? GROUP BY fighter",
      args: [fightId],
    })

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
      const existing = await db.execute({
        sql: "SELECT fighter FROM Vote WHERE fightId = ? AND voterId = ?",
        args: [fightId, voterId],
      })
      if (existing.rows.length > 0) {
        userVote = existing.rows[0].fighter as string
      }
    }

    return NextResponse.json({ counts, userVote, total })
  } catch (error) {
    console.error("Get votes error:", error)
    return NextResponse.json(
      { error: "Failed to get votes" },
      { status: 500 }
    )
  }
}
