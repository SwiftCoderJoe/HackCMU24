"use client"

import { SessionProvider } from "next-auth/react"
import { useSession } from "next-auth/react"

import Image from "next/image";
import HugeTitle from "../Components/Typography/HugeTitle";
import ListItem from "../Components/ListItem";
import { FormEvent, useState } from "react";

export default function Account() {
  const [file, setFile] = useState<File>()
  const { data: session } = useSession()
  const needsUploading = true;

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
              <input className="cursor-pointer hover:bg-slate-200 hover:text-black rounded-md transition-all duration-200 border-slate-200 border" type="submit" value="Upload" />
            </form>
          ): (<p>Uploaded successfully.</p>)}
          <div className="flex flex-col items-start gap-2">
            <p className="text-3xl">Find a study group:</p>
            <a href="account/classes" className="text-xl cursor-pointer hover:bg-slate-200 hover:text-black rounded-md transition-all duration-200 border-slate-200 border">Search by class</a>
            <a className="text-xl cursor-pointer hover:bg-slate-200 hover:text-black rounded-md transition-all duration-200 border-slate-200 border">Search by time..?</a>
            <a className="text-xl cursor-pointer hover:bg-slate-200 hover:text-black rounded-md transition-all duration-200 border-slate-200 border">Search by person..?</a>
          </div>
        </div>
      </main>
    );
}
