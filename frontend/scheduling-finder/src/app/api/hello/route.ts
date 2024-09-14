import { register } from "../../../lib/user_functions"

export async function GET(request: Request) {
    return Response.json({ text: "hello" })
}