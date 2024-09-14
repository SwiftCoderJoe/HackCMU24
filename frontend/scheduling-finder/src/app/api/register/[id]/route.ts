import { getUserData, register } from "@/lib/user_functions";

export async function PUT(request: Request, { params }: {params: { id: string }}) {
    if (await getUserData(params.id) == undefined) {
        register(params.id)
    }

    return Response.json({success: true})
}