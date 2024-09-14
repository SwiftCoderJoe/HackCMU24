"use client"

import { SessionProvider } from "next-auth/react"
import { useSession } from "next-auth/react"

import HugeTitle from "../../Components/Typography/HugeTitle";
import ListItem from "../../Components/ListItem";
import { FormEvent, useState } from "react";
import Calendar from "../../Components/Calendar";

export default function Account({ params }: { params: { studentId: string } }) {
  const randomBooleanArray = [
    [true, false, true, false, true, true, false, true, false, false, true, true, false, true, true, false, true, false, true, true, false, false, true, false, true, true, false, true, false, true, true, false, true, false, false, true, false, true, true, false, true, true, false, false, true, false, true, true],
    [false, true, false, true, false, false, true, false, true, true, false, false, true, false, false, true, false, true, false, false, true, true, false, true, false, false, true, false, true, false, false, true, false, true, true, false, true, false, false, true, false, false, true, true, false, true, false, false],
    [true, false, true, false, true, true, false, true, false, false, true, true, false, true, true, false, true, false, true, true, false, false, true, false, true, false, true, true, false, true, false, false, true, true, false, true, false, true, true, false, true, false, true, true, false, false, true, false],
    [false, true, false, true, false, false, true, false, true, true, false, false, true, false, false, true, false, true, false, false, true, true, false, true, false, true, false, false, true, false, true, true, false, false, true, false, true, false, false, true, false, true, false, false, true, true, false, true],
    [true, false, true, false, true, true, false, true, false, false, true, true, false, true, true, false, true, false, true, true, false, false, true, false, true, true, false, true, false, true, true, false, true, false, false, true, false, true, true, false, true, true, false, false, true, false, true, true],
    [false, true, false, true, false, false, true, false, true, true, false, false, true, false, false, true, false, true, false, false, true, true, false, true, false, false, true, false, true, false, false, true, false, true, true, false, true, false, false, true, false, false, true, true, false, true, false, false],
    [true, false, true, false, true, true, false, true, false, false, true, true, false, true, true, false, true, false, true, true, false, false, true, false, true, true, false, true, false, true, true, false, true, false, false, true, false, true, true, false, true, true, false, false, true, false, true, true],
  ];

  return (
      <main className="flex flex-col gap-20 items-start justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <header className="flex flex-col gap-2 row-start-2 items-center sm:items-start">
          <p className="text-3xl">Information for</p>
          <HugeTitle>{params.studentId}.</HugeTitle>
        </header>
        <div className="flex flex-col gap-5 items-start">
          <div className="flex flex-col items-stretch gap-2">
            <p className="text-3xl">Study groups:</p>
            <ListItem title="Haolin's Study Group" caption="Tuesdays, Thursdays, 7:00pm" href="/groups/haolin-group"/>
            <ListItem title="Tyler's Study Group" caption="Mondays, Fridays, 6:30pm" />
            <ListItem title="Joe's L33t h4x0rz" caption="Saturdays, 3am" />
          </div>
          <div className="flex flex-col items-stretch gap-2">
            <p className="text-3xl">Schedule:</p>
            <Calendar busyArray={randomBooleanArray}/>
          </div>
        </div>
      </main>
    );
}
