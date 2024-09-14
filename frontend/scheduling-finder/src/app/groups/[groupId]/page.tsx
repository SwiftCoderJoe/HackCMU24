"use client"

import HugeTitle from "../../Components/Typography/HugeTitle";
import ListItem from "@/app/Components/ListItem";
import { useSession } from "next-auth/react"

export default function GroupPage({ params }: { params: { groupId: string } }) {
  const { data: session } = useSession()
  
  if (!session) { return (<p>loading...</p>)}

  return (
    <main className="flex flex-col gap-20 items-start justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="flex flex-col gap-2 row-start-2 items-center sm:items-start">
        <a className="text-3xl">Information for</a>
        <HugeTitle>{params.groupId}.</HugeTitle>
      </header>
      <div className="flex flex-col gap-5 items-start">
        
        <div className="flex flex-col gap-2 items-stretch">
          <p className="text-3xl">Students in this group:</p>
          <ListItem title="Haolin"/>
          <ListItem title="Tyler"/>
          <ListItem title="Joe"/>
        </div>
      </div>
    </main>
  )
}