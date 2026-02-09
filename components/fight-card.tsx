"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { XLogo } from "./x-logo"

interface Fighter {
  name: string
  image: string
}

interface FightCardProps {
  fightId: number
  fightLabel: string
  fighterA: Fighter
  fighterB: Fighter
  mockVotes?: Record<string, number>
  onBack: () => void
}

export function FightCard({ fightId, fightLabel, fighterA, fighterB, mockVotes, onBack }: FightCardProps) {
  const [voted, setVoted] = useState<string | null>(null)
  const [counts, setCounts] = useState<Record<string, number>>({})
  const [total, setTotal] = useState(0)
  const [voting, setVoting] = useState(false)

  // Fetch existing votes on mount (merge with mock data)
  const fetchVotes = useCallback(async () => {
    try {
      const res = await fetch(`/api/votes/${fightId}`)
      if (res.ok) {
        const data = await res.json()
        const realCounts: Record<string, number> = data.counts || {}

        // Merge mock votes with real votes
        if (mockVotes) {
          for (const [name, count] of Object.entries(mockVotes)) {
            realCounts[name] = (realCounts[name] || 0) + count
          }
        }

        const realTotal = Object.values(realCounts).reduce((sum, c) => sum + c, 0)
        setCounts(realCounts)
        setTotal(realTotal)
        if (data.userVote) setVoted(data.userVote)
      }
    } catch (err) {
      console.error("Failed to fetch votes:", err)
    }
  }, [fightId, mockVotes])

  useEffect(() => {
    fetchVotes()
  }, [fetchVotes])

  const castVote = async (fighterName: string) => {
    if (voted || voting) return
    setVoting(true)

    try {
      const res = await fetch("/api/votes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fightId, fighter: fighterName }),
      })

      const data = await res.json()

      if (res.ok) {
        setVoted(fighterName)
        // Refresh counts
        await fetchVotes()
      } else if (data.error === "already_voted") {
        // They already voted (maybe from another tab or IP match)
        setVoted(data.vote)
        await fetchVotes()
      }
    } catch (err) {
      console.error("Failed to vote:", err)
    } finally {
      setVoting(false)
    }
  }

  const getPercentage = (name: string) => {
    if (total === 0) return 0
    return Math.round(((counts[name] || 0) / total) * 100)
  }

  const pctA = getPercentage(fighterA.name)
  const pctB = getPercentage(fighterB.name)

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Back button */}
      <button
        type="button"
        onClick={onBack}
        className="absolute top-6 left-6 z-20 text-foreground text-sm lowercase tracking-wider hover:opacity-60 transition-opacity cursor-pointer"
        aria-label="Back to fight list"
      >
        {"< back"}
      </button>

      {/* Main matchup area - fills the screen */}
      <div className="flex-1 flex flex-col">
        {/* Fighter names row */}
        <div className="flex items-center justify-between px-8 md:px-16 pt-16 pb-2">
          <span
            className="text-foreground lowercase tracking-wider"
            style={{ fontSize: "clamp(1.4rem, 4vw, 2.5rem)" }}
          >
            {fighterA.name}
            {voted && <span className="ml-2 text-muted-foreground" style={{ fontSize: "0.6em" }}>{pctA}%</span>}
          </span>
          <span
            className="text-foreground lowercase tracking-wider"
            style={{ fontSize: "clamp(1.4rem, 4vw, 2.5rem)" }}
          >
            {voted && <span className="mr-2 text-muted-foreground" style={{ fontSize: "0.6em" }}>{pctB}%</span>}
            {fighterB.name}
          </span>
        </div>

        {/* Fighters and center text */}
        <div className="relative flex-1 flex items-stretch">
          {/* Left bar - height scales like a progress bar with fighter A votes */}
          <div className="shrink-0 flex flex-col justify-end ml-4 md:ml-8" style={{ width: "9px" }}>
            <div
              className="w-full bg-foreground transition-all duration-700 ease-out"
              style={{ height: voted ? `${Math.max(2, pctA)}%` : "100%" }}
            />
          </div>

          {/* Fighter A */}
          <button
            type="button"
            onClick={() => castVote(fighterA.name)}
            disabled={!!voted || voting}
            className={`relative flex-1 cursor-pointer transition-all duration-300 overflow-hidden ${
              voted === fighterA.name
                ? "opacity-100"
                : voted
                  ? "opacity-30"
                  : "hover:scale-[1.02]"
            } ${voted || voting ? "cursor-default" : ""}`}
            aria-label={`Vote for ${fighterA.name}`}
          >
            <Image
              src={fighterA.image || "/placeholder.svg"}
              alt={fighterA.name}
              fill
              className="object-contain object-bottom"
              sizes="50vw"
            />
          </button>

          {/* Center text - vertical */}
          <div className="flex flex-col items-center justify-center shrink-0 z-10">
            <p
              className="text-foreground lowercase tracking-wider text-center"
              style={{
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                fontSize: "clamp(0.7rem, 1.5vw, 1rem)",
                letterSpacing: "0.15em",
              }}
            >
              {voting
                ? "voting..."
                : voted
                  ? `you voted ${voted}`
                  : "click your fighter to vote"}
            </p>
          </div>

          {/* Fighter B */}
          <button
            type="button"
            onClick={() => castVote(fighterB.name)}
            disabled={!!voted || voting}
            className={`relative flex-1 cursor-pointer transition-all duration-300 overflow-hidden ${
              voted === fighterB.name
                ? "opacity-100"
                : voted
                  ? "opacity-30"
                  : "hover:scale-[1.02]"
            } ${voted || voting ? "cursor-default" : ""}`}
            aria-label={`Vote for ${fighterB.name}`}
          >
            <Image
              src={fighterB.image || "/placeholder.svg"}
              alt={fighterB.name}
              fill
              className="object-contain object-bottom"
              sizes="50vw"
            />
          </button>

          {/* Right bar - height scales like a progress bar with fighter B votes */}
          <div className="shrink-0 flex flex-col justify-end mr-4 md:mr-8" style={{ width: "9px" }}>
            <div
              className="w-full bg-foreground transition-all duration-700 ease-out"
              style={{ height: voted ? `${Math.max(2, pctB)}%` : "100%" }}
            />
          </div>
        </div>
      </div>

      {/* Bottom logo */}
      <div className="flex justify-center py-8">
        <XLogo className="w-14" />
      </div>
    </div>
  )
}
