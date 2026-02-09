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

      {/* Fight label */}
      <div className="text-center pt-16 pb-4">
        <h1 className="text-foreground lowercase tracking-wider" style={{ fontSize: "clamp(1rem, 3vw, 1.5rem)" }}>
          {fightLabel}
        </h1>
      </div>

      {/* Main matchup area */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="relative flex items-center justify-center w-full max-w-4xl">
          {/* Left bar */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-foreground hidden md:block" />

          {/* Fighter A (left) */}
          <button
            type="button"
            onClick={() => setVoted(fighterA.name)}
            className={`relative flex-1 flex flex-col items-center cursor-pointer transition-all duration-300 group ${
              voted === fighterA.name ? "opacity-100 scale-105" : voted ? "opacity-40" : "hover:scale-105"
            }`}
            aria-label={`Vote for ${fighterA.name}`}
          >
            <span className="text-foreground lowercase tracking-wider mb-4" style={{ fontSize: "clamp(1.2rem, 3vw, 2rem)" }}>
              {fighterA.name}
            </span>
            <div className="relative w-48 h-80 md:w-64 md:h-[28rem]">
              <Image
                src={fighterA.image || "/placeholder.svg"}
                alt={fighterA.name}
                fill
                className="object-contain object-center"
                sizes="(max-width: 768px) 50vw, 256px"
              />
            </div>
          </button>

          {/* Center text - vertical */}
          <div className="flex flex-col items-center justify-center mx-2 md:mx-6">
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

          {/* Fighter B (right) */}
          <button
            type="button"
            onClick={() => setVoted(fighterB.name)}
            className={`relative flex-1 flex flex-col items-center cursor-pointer transition-all duration-300 group ${
              voted === fighterB.name ? "opacity-100 scale-105" : voted ? "opacity-40" : "hover:scale-105"
            }`}
            aria-label={`Vote for ${fighterB.name}`}
          >
            <span className="text-foreground lowercase tracking-wider mb-4" style={{ fontSize: "clamp(1.2rem, 3vw, 2rem)" }}>
              {fighterB.name}
            </span>
            <div className="relative w-48 h-80 md:w-64 md:h-[28rem]">
              <Image
                src={fighterB.image || "/placeholder.svg"}
                alt={fighterB.name}
                fill
                className="object-contain object-center"
                sizes="(max-width: 768px) 50vw, 256px"
              />
            </div>
          </button>

          {/* Right bar */}
          <div className="absolute right-0 top-0 bottom-0 w-1 bg-foreground hidden md:block" />
        </div>
      </div>

      {/* Bottom logo */}
      <div className="flex justify-center py-8">
        <XLogo className="w-10 h-10 text-foreground" />
      </div>
    </div>
  )
}
