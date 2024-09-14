"use client"

import { SessionProvider } from "next-auth/react"
import { useSession } from "next-auth/react"

import Image from "next/image";
import HugeTitle from "../../Components/Typography/HugeTitle";
import { FormEvent, useEffect, useState } from "react";
import ListItem from "@/app/Components/ListItem";
import { User } from "@/lib/user";

export default function Account() {
  const [userData, setUserData] = useState<User | null>(null)
  const { data: session } = useSession()

  useEffect(() => {
    if (!session) { return }
    async function fetchPosts() {
      let res = await fetch('api/student/' + session?.user?.name)
      let data = await res.json()
      console.log(data)
      setUserData(data)
    }
    fetchPosts()
  }, [session])

  if (!userData) { return (<p>loading...</p>)}

  return (
    <main className="flex flex-col gap-20 items-start justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="flex flex-col gap-2 row-start-2 items-center sm:items-start">
        <a href="/account" className="cursor-pointer text-3xl">{session?.user?.name}'s</a>
        <HugeTitle>Classes.</HugeTitle>
        <ListItem title="Back to Home" caption="Home" href="/account"/>
      </header>
      <div className="flex flex-col gap-5 items-start">
        <div className="flex flex-col gap-2 items-stretch">
            {userData.classes.map(course => (
              <ListItem title={course.courseNum} caption={course.courseName} href={"/classes/" + course.courseNum}/>
            ))}
        </div>
      </div>
    </main>
  );


}