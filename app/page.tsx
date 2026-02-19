"use client"

import { useEffect, useState } from "react"
import { FightMenu } from "@/components/fight-menu"
import { FightCard } from "@/components/fight-card"

const toMinutesOfDay = (hour24: number, minute: number) => hour24 * 60 + minute

const fights = [
  {
    id: 1,
    label: "fight 1",
    startTime: toMinutesOfDay(2, 20),
    endTime: toMinutesOfDay(2, 30),
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
      mobileImageShiftClass: "-translate-y-[10%]",
    },
    fighterB: {
      name: "osh",
      image: "/images/oshmatchup.jpg",
      mobileImageShiftClass: "-translate-y-[8%]",
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
      mobileImageShiftClass: "-translate-y-[8%]",
    },
    fighterB: {
      name: "caroline",
      image: "/images/carolinematchup.jpg",
      mobileImageShiftClass: "-translate-y-[8%]",
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
      mobileImageShiftClass: "-translate-y-[12%]",
    },
    fighterB: {
      name: "nedas",
      image: "/images/nedasmatchup.jpg",
      flipHorizontal: true,
      scale: 0.82,
      mobileImageShiftClass: "-translate-y-[7%]",
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
      mobileImageShiftClass: "-translate-y-[10%]",
    },
    fighterB: {
      name: "doug",
      image: "/images/dougmatchup.jpg",
      mobileImageShiftClass: "-translate-y-[10%]",
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
