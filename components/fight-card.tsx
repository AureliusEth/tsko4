"use client"

import { useState } from "react"
import Image from "next/image"
import { XLogo } from "./x-logo"

interface Fighter {
  name: string
  image: string
}

interface FightCardProps {
  fightLabel: string
  fighterA: Fighter
  fighterB: Fighter
  onBack: () => void
}

export function FightCard({ fightLabel, fighterA, fighterB, onBack }: FightCardProps) {
  const [voted, setVoted] = useState<string | null>(null)

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
          </span>
          <span
            className="text-foreground lowercase tracking-wider"
            style={{ fontSize: "clamp(1.4rem, 4vw, 2.5rem)" }}
          >
            {fighterB.name}
          </span>
        </div>

        {/* Fighters and center text */}
        <div className="relative flex-1 flex items-stretch">
          {/* Left bar */}
          <div className="w-1.5 bg-foreground shrink-0" />

          {/* Fighter A */}
          <button
            type="button"
            onClick={() => setVoted(fighterA.name)}
            className={`relative flex-1 cursor-pointer transition-all duration-300 overflow-hidden ${
              voted === fighterA.name
                ? "opacity-100"
                : voted
                  ? "opacity-30"
                  : "hover:scale-[1.02]"
            }`}
            aria-label={`Vote for ${fighterA.name}`}
          >
            <Image
              src={fighterA.image || "/placeholder.svg"}
              alt={fighterA.name}
              fill
              className="object-contain object-bottom"
              style={{ mixBlendMode: "multiply" }}
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
              {voted ? `you voted ${voted}` : "click your fighter to vote"}
            </p>
          </div>

          {/* Fighter B */}
          <button
            type="button"
            onClick={() => setVoted(fighterB.name)}
            className={`relative flex-1 cursor-pointer transition-all duration-300 overflow-hidden ${
              voted === fighterB.name
                ? "opacity-100"
                : voted
                  ? "opacity-30"
                  : "hover:scale-[1.02]"
            }`}
            aria-label={`Vote for ${fighterB.name}`}
          >
            <Image
              src={fighterB.image || "/placeholder.svg"}
              alt={fighterB.name}
              fill
              className="object-contain object-bottom"
              style={{ mixBlendMode: "multiply" }}
              sizes="50vw"
            />
          </button>

          {/* Right bar */}
          <div className="w-1.5 bg-foreground shrink-0" />
        </div>
      </div>

      {/* Bottom logo */}
      <div className="flex justify-center py-8">
        <XLogo className="w-10 h-10 text-foreground" />
      </div>
    </div>
  )
}
