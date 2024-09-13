import { ReactNode } from "react";

interface Props {
    children: ReactNode
}

export default function HugeTitle({ children }: Props) {
    return (
        <h1 className="text-8xl text-black italic bg-slate-200 rounded-md">{children}</h1>
    )
}