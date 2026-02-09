"use client"

import { useState, useEffect } from "react"
import { XLogo } from "./x-logo"

interface FightMenuProps {
  fights: { id: number; label: string; startTime: number; endTime: number }[]
  onSelectFight: (fightId: number) => void
}

export function FightMenu({ fights, onSelectFight }: FightMenuProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [now, setNow] = useState(Math.floor(Date.now() / 1000))

  // Tick every second to check which fight is live
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Math.floor(Date.now() / 1000))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // Find the currently live fight
  const liveFightId = fights.find((f) => now >= f.startTime && now < f.endTime)?.id ?? null

  return (
    <div className="flex flex-col items-center h-screen bg-background px-6 py-10">
      <nav className="flex flex-col items-center justify-evenly flex-1 w-full" aria-label="Fight card menu">
        {fights.map((fight) => {
          const isLive = liveFightId === fight.id
          const isHovered = hoveredId === fight.id
          const isEnlarged = isLive || isHovered
          return (
            <button
              key={fight.id}
              type="button"
              className="transition-all duration-300 ease-out cursor-pointer text-foreground lowercase tracking-wider select-none hover:opacity-80"
              style={{
                fontSize: isEnlarged ? "clamp(5rem, 15vw, 12rem)" : "clamp(2.5rem, 7vw, 4rem)",
                lineHeight: 1.2,
              }}
              onMouseEnter={() => setHoveredId(fight.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => onSelectFight(fight.id)}
              aria-label={`View ${fight.label}`}
            >
              {fight.label}
              {isLive && (
                <span
                  className="block text-muted-foreground lowercase tracking-wider -mt-2"
                  style={{ fontSize: "clamp(1rem, 3vw, 1.8rem)" }}
                >
                  「click to vote」
                </span>
              )}
            </button>
          )
        })}
      </nav>

      <div className="py-6">
        <XLogo className="w-20" />
      </div>
    </div>
  )
}
