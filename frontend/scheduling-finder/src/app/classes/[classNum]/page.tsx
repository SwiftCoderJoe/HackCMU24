"use client"

import HugeTitle from "../../Components/Typography/HugeTitle";
import ListItem from "@/app/Components/ListItem";
import { useSession } from "next-auth/react"

export default function ClassPage({ params }: { params: { classNum: string } }) {
  const { data: session } = useSession()
  
  if (!session) { return (<p>loading...</p>)}

  return (
    <main className="flex flex-col gap-20 items-start justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="flex flex-col gap-2 row-start-2 items-center sm:items-start">
        <a className="text-3xl">{session?.user?.name}'s suggestions for</a>
        <HugeTitle>{params.classNum}.</HugeTitle>
        <ListItem title="Back to Home" caption="Home" href="/account"/>
      </header>
      <div className="flex flex-col gap-5 items-start">
        <div className="flex flex-col gap-2 items-stretch">
          <p className="text-3xl">Compatible study groups:</p>
          <ListItem title="Haolin's Study Group" caption="Tuesdays, Thursdays, 7:00pm" href="/groups/haolin-group"/>
          <ListItem title="Tyler's Study Group" caption="Mondays, Fridays, 6:30pm" />
          <ListItem title="Joe's L33t h4x0rz" caption="Saturdays, 3am" />
        </div>
        <div className="flex flex-col gap-2 items-stretch">
          <p className="text-3xl">Students with common free time:</p>
          <ListItem title="Will Cong" caption="8 Hours" />
          <ListItem title="Chris Nam" caption="7 Hours" />
          <ListItem title="Rohit Nair" caption="5 Hours" />
          <ListItem title="Will Cong" caption="3 Hours" />
          <ListItem title="Chris Nam" caption="3 Hours" />
          <ListItem title="Rohit Nair" caption="3 Hours" />
          <ListItem title="Will Cong" caption="2 Hours" />
          <ListItem title="Chris Nam" caption="1 Hour" />
          <ListItem title="Rohit Nair" caption="1 Hour" />
        </div>
      </div>
    </main>
  )
}