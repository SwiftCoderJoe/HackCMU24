import Link from "next/link"
import { ReactNode } from "react"

interface Props {
    title: String
    caption?: String
    href?: string
}

export default function ListItem({title, caption, href}: Props) {
    return (
        href != undefined ? 
            (<Link href={href} className="cursor-pointer">
                <div className="hover:bg-slate-200 hover:text-black transition-all duration-200 border border-slate-200 rounded-md p-2">
                    <p className="text-3xl"><strong><em>{title + (caption != undefined ? ": " : "")}</em></strong>{caption ?? ""}</p>
                </div>
            </Link>)
            :
            (<div className="border border-slate-200 rounded-md p-2">
                <p className="text-3xl"><strong><em>{title + (caption != undefined ? ": " : "")}</em></strong>{caption ?? ""}</p>
            </div>)
        
        
    )
}