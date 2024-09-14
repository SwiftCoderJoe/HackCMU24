// pages/api/update.js
import { setup } from "@/lib/user_functions";
import "./ics_to_json"
import icsToJson from "./ics_to_json";
export async function PUT(request : Request, { params }: {params: { id: string }}) {
    // Extract your data from the request body
    const data = await request.text();
    const cleaned_data = icsToJson(data);
    // Send a response back to the client
    
    setup(params.id, cleaned_data);

    console.log(cleaned_data);
    return Response.json({text : "done" })
}