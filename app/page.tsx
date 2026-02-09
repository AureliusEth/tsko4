"use client"

import { useState } from "react"
import { FightMenu } from "@/components/fight-menu"
import { FightCard } from "@/components/fight-card"

const fights = [
  {
    id: 1,
    label: "fight 01",
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
    fighterA: {
      name: "fighter a",
      image: "/images/seyimatchup.jpg",
    },
    fighterB: {
      name: "fighter b",
      image: "/images/loganmatchup.jpg",
    },
  },
  {
    id: 3,
    label: "fight 03",
    fighterA: {
      name: "fighter c",
      image: "/images/seyimatchup.jpg",
    },
    fighterB: {
      name: "fighter d",
      image: "/images/loganmatchup.jpg",
    },
  },
  {
    id: 4,
    label: "fight 04",
    fighterA: {
      name: "fighter e",
      image: "/images/seyimatchup.jpg",
    },
    fighterB: {
      name: "fighter f",
      image: "/images/loganmatchup.jpg",
    },
  },
  {
    id: 5,
    label: "fight 05",
    fighterA: {
      name: "fighter g",
      image: "/images/seyimatchup.jpg",
    },
    fighterB: {
      name: "fighter h",
      image: "/images/loganmatchup.jpg",
    },
  },
  {
    id: 6,
    label: "fight 06",
    fighterA: {
      name: "fighter i",
      image: "/images/seyimatchup.jpg",
    },
    fighterB: {
      name: "fighter j",
      image: "/images/loganmatchup.jpg",
    },
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
          onBack={() => setSelectedFight(null)}
        />
      </main>
    )
  }

  return (
    <main>
      <FightMenu
        fights={fights.map((f) => ({ id: f.id, label: f.label }))}
        onSelectFight={(id) => setSelectedFight(id)}
      />
    </main>
  )
}
