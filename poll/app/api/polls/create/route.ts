export async function POST(request: Request) {
    const { title, description, options } = await request.json();

    // Create a new poll (mock implementation)
    const newPoll = {
        id: Date.now(),
        title,
        description,
        options,
    };

    return Response.json({ success: true, poll: newPoll });
}
