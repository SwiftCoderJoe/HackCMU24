"use client"

import { SessionProvider } from "next-auth/react"
import { useSession } from "next-auth/react"

import Image from "next/image";
import HugeTitle from "../Components/Typography/HugeTitle";
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

  return (
    <SessionProvider>
      <main className="flex flex-col gap-20 items-start justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <header className="flex flex-col gap-2 row-start-2 items-center sm:items-start">
          <p className="text-3xl">Welcome,</p>
          <HugeTitle>{session?.user?.name}.</HugeTitle>
        </header>
        <div className="flex flex-col gap-5">
          <p className="text-3xl">Schedule:</p>
          {needsUploading ? (
            <form className="flex flex-col items-start gap-2" onSubmit={onSubmit}>
              <input
                type="file"
                name="file"
                onChange={(e) => setFile(e.target.files?.[0])}
              />
              <input className="cursor-pointer hover:bg-slate-200 hover:text-black rounded-md transition-all duration-200 border-slate-200 border" type="submit" value="Upload" />
            </form>
          ): (<p>Uploaded successfully.</p>)}
          <p>Actions:</p>
          <a href="text-5xl cursor-pointer hover:bg-slate-200 hover:text-black rounded-md transition-all duration-200 border-slate-200 border">Find a study group</a>
        </div>
      </main>
    </SessionProvider>
    );
}
