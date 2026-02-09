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
      image: "/images/seyimatchup.jpeg",
    },
    fighterB: {
      name: "logan",
      image: "/images/loganmatchup.jpeg",
    },
  },
  {
    id: 2,
    label: "fight 02",
    fighterA: {
      name: "fighter a",
      image: "/images/seyimatchup.jpeg",
    },
    fighterB: {
      name: "fighter b",
      image: "/images/loganmatchup.jpeg",
    },
  },
  {
    id: 3,
    label: "fight 03",
    fighterA: {
      name: "fighter c",
      image: "/images/seyimatchup.jpeg",
    },
    fighterB: {
      name: "fighter d",
      image: "/images/loganmatchup.jpeg",
    },
  },
  {
    id: 4,
    label: "fight 04",
    fighterA: {
      name: "fighter e",
      image: "/images/seyimatchup.jpeg",
    },
    fighterB: {
      name: "fighter f",
      image: "/images/loganmatchup.jpeg",
    },
  },
  {
    id: 5,
    label: "fight 05",
    fighterA: {
      name: "fighter g",
      image: "/images/seyimatchup.jpeg",
    },
    fighterB: {
      name: "fighter h",
      image: "/images/loganmatchup.jpeg",
    },
  },
  {
    id: 6,
    label: "fight 06",
    fighterA: {
      name: "fighter i",
      image: "/images/seyimatchup.jpeg",
    },
    fighterB: {
      name: "fighter j",
      image: "/images/loganmatchup.jpeg",
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
