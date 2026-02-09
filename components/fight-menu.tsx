"use client"

import { useState } from "react"
import { XLogo } from "./x-logo"

interface FightMenuProps {
  fights: { id: number; label: string }[]
  onSelectFight: (fightId: number) => void
}

export function FightMenu({ fights, onSelectFight }: FightMenuProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-6 py-12">
      <nav className="flex flex-col items-center gap-8" aria-label="Fight card menu">
        {fights.map((fight) => {
          const isHovered = hoveredId === fight.id
          return (
            <button
              key={fight.id}
              type="button"
              className="transition-all duration-300 ease-out cursor-pointer text-foreground lowercase tracking-wider select-none hover:opacity-80"
              style={{
                fontSize: isHovered ? "clamp(3rem, 8vw, 6rem)" : "clamp(1.5rem, 4vw, 2.5rem)",
                lineHeight: 1.2,
              }}
              onMouseEnter={() => setHoveredId(fight.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => onSelectFight(fight.id)}
              aria-label={`View ${fight.label}`}
            >
              {fight.label}
            </button>
          )
        })}
      </nav>

      <div className="mt-16">
        <XLogo className="w-14" />
      </div>
    </div>
  )
}
