import { PollResult } from "@/lib/types/Poll";
import { broadcastPollUpdate } from "@/app/api/polls/[slug]/sse/route";

export async function GET(
    request: Request,
    { params }: { params: { slug: string } }
) {
    const awaitedParams = await params;
    const pollId = awaitedParams.slug;

    try {
        const updatedPoll: PollResult = {
            id: 1,
            question: "What part of the application would you like to work on?",
            description: "A poll about user dev preference",
            title: "Poll Result",
            results: [
                { id: 1, text: "Frontend", voteCount: 99, color: "bg-red-400" },
                { id: 2, text: "Backend", voteCount: 39, color: "bg-cyan-400" },
                {
                    id: 3,
                    text: "I can do both",
                    voteCount: 25,
                    color: "bg-gray-300",
                },
                {
                    id: 4,
                    text: "I don't know",
                    voteCount: 0,
                    color: "bg-gray-200",
                },
            ],
        };

        // Broadcast the updated poll data to all connected clients
        broadcastPollUpdate(pollId, updatedPoll);

        return Response.json({ success: true, poll: updatedPoll });
    } catch {
        return Response.json({ error: "Failed to vote" }, { status: 500 });
    }
}
