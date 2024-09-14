"use client"

import HugeTitle from "../../Components/Typography/HugeTitle";
import ListItem from "@/app/Components/ListItem";
import { User } from "@/lib/user";
import { getTimes, studentSearch } from "@/lib/student_search"
import { getClass } from "@/lib/class_functions";
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";

export default function ClassPage({ params }: { params: { classNum: string } }) {
  const [userData, setUserData] = useState<User | null>(null)
  const [studentData, setStudentData] = useState<any>(null)
  const [courseData, setCourseData] = useState<any>(null)
  const { data: session } = useSession()

  useEffect(() => {
    if (!session) { return }
    async function fetchPosts() {
      let res = await fetch('/api/student/' + session?.user?.name)
      let data = await res.json()
      console.log(data)
      setUserData(data)

      // get the class
      let classData:any = await getClass(decodeURI(params.classNum));

      let studentData = studentSearch(await getTimes(session?.user?.name), classData.users.filter((user: any) => user != session?.user?.name), 16, 44)

      console.log(studentData)
      console.log(classData)
      setStudentData(studentData);
      setCourseData(classData);
    }
    fetchPosts()
  }, [session])
  
  if (!userData) { return (<p>loading...</p>)}

  return (
    <main className="flex flex-col gap-20 items-start justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="flex flex-col gap-2 row-start-2 items-center sm:items-start">
        <a className="text-3xl">{session?.user?.name}'s suggestions for</a>
        <HugeTitle>{decodeURI(params.classNum).split(" ")[0]}.</HugeTitle>
        <ListItem title="Back to Home" caption="Home" href="/account"/>
      </header>
      <div className="flex flex-col gap-5 items-start">
        <div className="flex flex-col gap-2 items-stretch">
          <p className="text-3xl">Study groups:</p>
          <ListItem title="Haolin's Study Group"href="/groups/haolin-group"/>
          <ListItem title="Tyler's Study Group"/>
          <ListItem title="Joe's L33t h4x0rz"/>
        </div>
        <div className="flex flex-col gap-2 items-stretch">
          <p className="text-3xl">Students with common free time:</p>

        </div>
      </div>
    </main>
  )
}