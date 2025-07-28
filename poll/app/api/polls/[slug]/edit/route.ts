import { PollRepository } from "@/lib/db/repositories/pollRepository";
import { SSEService } from "@/lib/services/sseService";
import { BasePollData, PollEditingPayload, PollType } from "@/lib/types/Poll";

export async function POST(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const body = await request.json() as PollEditingPayload;
    const { title, description, question, options } = body;
    const type: PollType = body.type as PollType || PollType.SINGLE;

    if (!title || !question || !options || options.length <= 1) {
        return new Response("Title, question, and options are required", {
            status: 400,
        });
    }

    const slug = await params.then((p) => p.slug);
    const pollId = Number(slug);

    // Update the poll in the database
    const updatedPoll: BasePollData | null = await PollRepository.updatePoll(
        pollId,
        { title, description, question, options, type }
    );

    if (!updatedPoll) {
        return new Response("Poll not found or update failed", { status: 404 });
    }

    // Broadcast the updated poll to all subscribers
    SSEService.broadcastToTopic(`poll:${pollId}`, "poll_update", updatedPoll);

    return new Response(JSON.stringify(updatedPoll), { status: 200 });
}