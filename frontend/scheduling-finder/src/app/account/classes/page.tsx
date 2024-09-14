"use client"

import { SessionProvider } from "next-auth/react"
import { useSession } from "next-auth/react"

import Image from "next/image";
import HugeTitle from "../../Components/Typography/HugeTitle";
import { FormEvent, useState } from "react";
import ListItem from "@/app/Components/ListItem";
import HomeButton from "@/app/Components/HomeButton";

export default function Account() {
  const { data: session } = useSession()

  if (!session) { return (<p>loading...</p>)}

  return (
    <main className="flex flex-col gap-20 items-start justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="flex flex-col gap-2 row-start-2 items-center sm:items-start">
        <a href="/account" className="cursor-pointer text-3xl">{session?.user?.name}'s</a>
        <HugeTitle>Classes.</HugeTitle>
      </header>
      <div className="flex flex-col gap-5 items-start">
        <div className="flex flex-col gap-2 items-stretch">
            <ListItem title="15151" caption="Mathematical Foundations for Computer Science" href="/classes/15151" />
            <ListItem title="21241" caption="Matrices and Linear Transformations" href="/classes/21241" />
            <ListItem title="15122" caption="Principles of Imperative Computation" href="/classes/15122" />
        </div>
        <HomeButton/>
      </div>
    </main>
  );


}