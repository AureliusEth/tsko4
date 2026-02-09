"use client"

import { useState } from "react"
import { FightMenu } from "@/components/fight-menu"
import { FightCard } from "@/components/fight-card"

// Generate demo start times: fight 1 starts now, each subsequent fight starts 20s later
const BASE_TIME = Math.floor(Date.now() / 1000)
const FIGHT_DURATION = 20 // seconds per fight for demo

const fights = [
  {
    id: 1,
    label: "fight 01",
    startTime: BASE_TIME,
    endTime: BASE_TIME + FIGHT_DURATION,
    fighterA: {
      name: "seyi",
      image: "/images/seyimatchup.jpg",
    },
    fighterB: {
      name: "logan",
      image: "/images/loganmatchup.jpg",
    },
  },
  {
    id: 2,
    label: "fight 02",
    startTime: BASE_TIME + FIGHT_DURATION,
    endTime: BASE_TIME + FIGHT_DURATION * 2,
    fighterA: {
      name: "fighter a",
      image: "/images/seyimatchup.jpg",
    },
    fighterB: {
      name: "fighter b",
      image: "/images/loganmatchup.jpg",
    },
    mockVotes: { "fighter a": 62, "fighter b": 38 },
  },
  {
    id: 3,
    label: "fight 03",
    startTime: BASE_TIME + FIGHT_DURATION * 2,
    endTime: BASE_TIME + FIGHT_DURATION * 3,
    fighterA: {
      name: "fighter c",
      image: "/images/seyimatchup.jpg",
    },
    fighterB: {
      name: "fighter d",
      image: "/images/loganmatchup.jpg",
    },
    mockVotes: { "fighter c": 45, "fighter d": 55 },
  },
  {
    id: 4,
    label: "fight 04",
    startTime: BASE_TIME + FIGHT_DURATION * 3,
    endTime: BASE_TIME + FIGHT_DURATION * 4,
    fighterA: {
      name: "fighter e",
      image: "/images/seyimatchup.jpg",
    },
    fighterB: {
      name: "fighter f",
      image: "/images/loganmatchup.jpg",
    },
    mockVotes: { "fighter e": 81, "fighter f": 19 },
  },
  {
    id: 5,
    label: "fight 05",
    startTime: BASE_TIME + FIGHT_DURATION * 4,
    endTime: BASE_TIME + FIGHT_DURATION * 5,
    fighterA: {
      name: "fighter g",
      image: "/images/seyimatchup.jpg",
    },
    fighterB: {
      name: "fighter h",
      image: "/images/loganmatchup.jpg",
    },
    mockVotes: { "fighter g": 33, "fighter h": 67 },
  },
  {
    id: 6,
    label: "fight 06",
    startTime: BASE_TIME + FIGHT_DURATION * 5,
    endTime: BASE_TIME + FIGHT_DURATION * 6,
    fighterA: {
      name: "fighter i",
      image: "/images/seyimatchup.jpg",
    },
    fighterB: {
      name: "fighter j",
      image: "/images/loganmatchup.jpg",
    },
    mockVotes: { "fighter i": 50, "fighter j": 50 },
  },
]

export default function Page() {
  const [selectedFight, setSelectedFight] = useState<number | null>(null)

  const activeFight = fights.find((f) => f.id === selectedFight)

  if (activeFight) {
    return (
      <main>
        <FightCard
          fightId={activeFight.id}
          fightLabel={activeFight.label}
          fighterA={activeFight.fighterA}
          fighterB={activeFight.fighterB}
          mockVotes={"mockVotes" in activeFight ? activeFight.mockVotes : undefined}
          onBack={() => setSelectedFight(null)}
        />
      </main>
    )
  }

  return (
    <main>
      <FightMenu
        fights={fights.map((f) => ({ id: f.id, label: f.label, startTime: f.startTime, endTime: f.endTime }))}
        onSelectFight={(id) => setSelectedFight(id)}
      />
    </main>
  )
}
