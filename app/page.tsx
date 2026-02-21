"use client"

import { useEffect, useState } from "react"
import { FightMenu } from "@/components/fight-menu"
import { FightCard } from "@/components/fight-card"

const toMinutesOfDay = (hour24: number, minute: number) => hour24 * 60 + minute

const fights = [
  {
    id: 1,
    label: "fight 1",
    startTime: toMinutesOfDay(0, 20),
    endTime: toMinutesOfDay(0, 30),
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
    label: "fight 2",
    startTime: toMinutesOfDay(0, 30),
    endTime: toMinutesOfDay(0, 40),
    fighterA: {
      name: "dani",
      image: "/images/danimatchup.jpg",
    },
    fighterB: {
      name: "leonie",
      image: "/images/leoniematchup.jpg",
      scale: 1.05,
      mobileScale: 1.05,
    },
  },
  {
    id: 3,
    label: "fight 3",
    startTime: toMinutesOfDay(1, 40),
    endTime: toMinutesOfDay(1, 50),
    fighterA: {
      name: "rain",
      image: "/images/Rainmatchup.jpg",
    },
    fighterB: {
      name: "lv2",
      image: "/images/lv2matchup.jpg",
      scale: 0.94,
      mobileScale: 0.94,
    },
  },
  {
    id: 4,
    label: "fight 4",
    startTime: toMinutesOfDay(1, 50),
    endTime: toMinutesOfDay(2, 0),
    fighterA: {
      name: "shalome",
      image: "/images/SHALOMEMATCHUP.jpg",
    },
    fighterB: {
      name: "caroline",
      image: "/images/carolinematchup.jpg",
    },
  },
  {
    id: 5,
    label: "fight 5",
    startTime: toMinutesOfDay(3, 0),
    endTime: toMinutesOfDay(3, 10),
    fighterA: {
      name: "matthew",
      image: "/images/matthewmatchup.jpg",
    },
    fighterB: {
      name: "nedas",
      image: "/images/nedasmatchup.jpg",
      flipHorizontal: true,
      scale: 0.92,
      mobileScale: 0.92,
    },
  },
  {
    id: 6,
    label: "fight 6",
    startTime: toMinutesOfDay(3, 10),
    endTime: toMinutesOfDay(3, 20),
    fighterA: {
      name: "robin",
      image: "/images/robinmatchup.jpg",
    },
    fighterB: {
      name: "doug",
      image: "/images/dougmatchup.jpg",
    },
  },
  {
    id: 7,
    label: "fight 7",
    startTime: toMinutesOfDay(3, 50),
    endTime: toMinutesOfDay(4, 0),
    fighterA: {
      name: "osh",
      image: "/images/oshmatchup.jpg",
      flipHorizontal: true,
    },
    fighterB: {
      name: "ziggy",
      image: "/images/ziggymatchup.jpg",
    },
  },
]

export default function Page() {
  const [mounted, setMounted] = useState(false)
  const [selectedFight, setSelectedFight] = useState<number | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <main className="min-h-screen bg-background" />
  }

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
