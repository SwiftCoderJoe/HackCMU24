import { ReactNode } from "react"

interface Props {
    title: String
    caption: String
}

export default function CaptionedButton({title, caption}: Props) {
    return (
        <div className="hover:bg-slate-200 hover:text-black transition-all duration-200 border border-slate-200 rounded-md p-2">
            <p className="text-3xl"><strong><em>{title + (caption != undefined ? ": " : "")}</em></strong>{caption ?? ""}</p>
        </div>
    )
}