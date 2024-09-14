"use client"

import { SessionProvider } from "next-auth/react"
import { useSession } from "next-auth/react"

import HugeTitle from "../Components/Typography/HugeTitle";
import ListItem from "../Components/ListItem";
import { FormEvent, useEffect, useState } from "react";
import Calendar from "../Components/Calendar";

export default function Account() {
  const [userData, setUserData] = useState(null)
  const { data: session } = useSession()
  const needsUploading = true

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

  const randomBooleanArray = [
    [true, false, true, false, true, true, false, true, false, false, true, true, false, true, true, false, true, false, true, true, false, false, true, false, true, true, false, true, false, true, true, false, true, false, false, true, false, true, true, false, true, true, false, false, true, false, true, true],
    [false, true, false, true, false, false, true, false, true, true, false, false, true, false, false, true, false, true, false, false, true, true, false, true, false, false, true, false, true, false, false, true, false, true, true, false, true, false, false, true, false, false, true, true, false, true, false, false],
    [true, false, true, false, true, true, false, true, false, false, true, true, false, true, true, false, true, false, true, true, false, false, true, false, true, false, true, true, false, true, false, false, true, true, false, true, false, true, true, false, true, false, true, true, false, false, true, false],
    [false, true, false, true, false, false, true, false, true, true, false, false, true, false, false, true, false, true, false, false, true, true, false, true, false, true, false, false, true, false, true, true, false, false, true, false, true, false, false, true, false, true, false, false, true, true, false, true],
    [true, false, true, false, true, true, false, true, false, false, true, true, false, true, true, false, true, false, true, true, false, false, true, false, true, true, false, true, false, true, true, false, true, false, false, true, false, true, true, false, true, true, false, false, true, false, true, true],
    [false, true, false, true, false, false, true, false, true, true, false, false, true, false, false, true, false, true, false, false, true, true, false, true, false, false, true, false, true, false, false, true, false, true, true, false, true, false, false, true, false, false, true, true, false, true, false, false],
    [true, false, true, false, true, true, false, true, false, false, true, true, false, true, true, false, true, false, true, true, false, false, true, false, true, true, false, true, false, true, true, false, true, false, false, true, false, true, true, false, true, true, false, false, true, false, true, true],
  ];

  const [file, setFile] = useState<File>()

  const onSubmit = async function(e: FormEvent) {
    e.preventDefault()
    if (!file) return;

    try {
      const data = new FormData()
      data.set('file', file)
  
      const res = await fetch("api/calendar_import", {
        method: "PUT",
        body: data
      });
    } catch(e) {
      console.error(e)
    }
  }

  if (!session) { return (<p>loading...</p>)}

  return (
      <main className="flex flex-col gap-20 items-start justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <header className="flex flex-col gap-2 row-start-2 items-center sm:items-start">
          <p className="text-3xl">Welcome,</p>
          <HugeTitle>{session?.user?.name}.</HugeTitle>
        </header>
        <div className="flex flex-col gap-5 items-start">
          {needsUploading ? (
            <form className="flex flex-col items-start gap-2" onSubmit={onSubmit}>
              <p className="text-3xl">Schedule:</p>
              <input
                type="file"
                name="file"
                onChange={(e) => setFile(e.target.files?.[0])}
              />
              <input className="p-2 text-3xl cursor-pointer hover:bg-slate-200 hover:text-black rounded-md transition-all duration-200 border-slate-200 border" type="submit" value="Upload" />
            </form>
          ): (<p>Uploaded successfully.</p>)}
          <div className="flex flex-col items-stretch gap-2">
            <p className="text-3xl">Find a study group:</p>
            <ListItem href="account/classes" title="Search by class" />
            <ListItem href="account/unknown" title="Search by student" />
          </div>
          <div className="flex flex-col items-stretch gap-2">
            <p className="text-3xl">My study groups:</p>
            <ListItem title="Haolin's Study Group" caption="Tuesdays, Thursdays, 7:00pm" href="/groups/haolin-group"/>
            <ListItem title="Tyler's Study Group" caption="Mondays, Fridays, 6:30pm" />
            <ListItem title="Joe's L33t h4x0rz" caption="Saturdays, 3am" />
          </div>
          <div className="flex flex-col items-stretch gap-2">
            <p className="text-3xl">My schedule:</p>
            <Calendar busyArray={randomBooleanArray}/>
          </div>
        </div>
      </main>
    );
}
