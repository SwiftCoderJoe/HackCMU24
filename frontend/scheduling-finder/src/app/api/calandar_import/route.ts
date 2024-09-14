// pages/api/update.js
import "./ics_to_json"
import icsToJson from "./ics_to_json";
export async function PUT(request : Request) {
    // Extract your data from the request body
    const data = icsToJson(request.body);
    // Send a response back to the client
    return Response.json({text : "Received" })
}