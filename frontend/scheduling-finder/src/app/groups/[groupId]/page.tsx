"use client"

import { getGroup } from "@/lib/group_functions";
import HugeTitle from "../../Components/Typography/HugeTitle";
import ListItem from "@/app/Components/ListItem";
import { User } from "@/lib/user";
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import { addGroup } from "@/lib/user_functions";
import { useRouter } from "next/navigation";

export default function GroupPage({ params }: { params: { groupId: string } }) {
  const router = useRouter()
  const [userData, setUserData] = useState<User | null>(null)
  const [group, setGroup] = useState<any>(null)
  const { data: session } = useSession()

  useEffect(() => {
    if (!session) { return }
    async function fetchData() {
      let res = await fetch('/api/student/' + session?.user?.name)
      let data = await res.json()
      setUserData(data)


      let group = await getGroup(decodeURI(params.groupId))

      setGroup(group);
      console.log(group)
      console.log("done")
    }
    fetchData()
  }, [session])

  const joinGroup = () => {
    addGroup(session?.user?.name, decodeURI(params.groupId)).then(() => {
      router.back();
    })
  }
  
  if (!session || !group) { return (<p>loading...</p>)}

  return (
    <main className="flex flex-col gap-20 items-start justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="flex flex-col gap-2 row-start-2 items-center sm:items-start">
        <a className="text-3xl">Information for</a>
        <HugeTitle>{decodeURI(params.groupId)}.</HugeTitle>
      </header>
      <div className="flex flex-col gap-5 items-start">
        
      <ListItem title="For class" caption={group.topicClass.split(" ")[0]}/>

        <div className="flex flex-col gap-2 items-stretch">
          <p className="text-3xl">Students in this group:</p>
          {group.users.map((user: any) => (
            <ListItem title={user}/>
          ))}
        </div>

        {group.users.includes(session?.user?.name) ? null :
          <div onClick={joinGroup}>
            <ListItem title="Join Group" href=""/>
          </div>
        }
      </div>
    </main>
  )
}