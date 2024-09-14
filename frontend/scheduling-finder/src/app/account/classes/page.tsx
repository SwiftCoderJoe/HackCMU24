"use client"

import { SessionProvider } from "next-auth/react"
import { useSession } from "next-auth/react"

import Image from "next/image";
import HugeTitle from "../../Components/Typography/HugeTitle";
import { FormEvent, useEffect, useState } from "react";
import ListItem from "@/app/Components/ListItem";
import { User, Course } from "@/lib/user";
import { getClass } from "@/lib/class_functions"

export default function Account() {
  const [userData, setUserData] = useState<User | null>(null)
  const [courseData, setCourseData] = useState<any>(null)
  const { data: session } = useSession()

  useEffect(() => {
    if (!session) { return }
    async function fetchData() {
      let res = await fetch('/api/student/' + session?.user?.name);
      let data = await res.json();
      console.log(data);

      let courseData: any = {};
      for (let course of data.classes) {
        courseData[course] = await getClass(course);
      }

      console.log(courseData)
      setUserData(data);
      setCourseData(courseData);
    }
    fetchData()
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
            {userData.classes.map(courseName => (
              <ListItem title={courseData[courseName].classNumber} caption={courseData[courseName].className} href={"/classes/" + courseName}/>
            ))}
        </div>
      </div>
    </main>
  );


}