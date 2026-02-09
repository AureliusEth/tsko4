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
    <div className="flex flex-col items-center h-screen bg-background px-6 py-10">
      <nav className="flex flex-col items-center justify-evenly flex-1 w-full" aria-label="Fight card menu">
        {fights.map((fight) => {
          const isHovered = hoveredId === fight.id
          return (
            <button
              key={fight.id}
              type="button"
              className="transition-all duration-300 ease-out cursor-pointer text-foreground lowercase tracking-wider select-none hover:opacity-80"
              style={{
                fontSize: isHovered ? "clamp(5rem, 15vw, 12rem)" : "clamp(2.5rem, 7vw, 4rem)",
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

      <div className="py-6">
        <XLogo className="w-20" />
      </div>
    </div>
  )
}
