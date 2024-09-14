// pages/api/update.js
export async function PUT(request : Request) {
    // Extract your data from the request body
    const data = request.body;

    // Send a response back to the client
    return Response.json({text : data })
}