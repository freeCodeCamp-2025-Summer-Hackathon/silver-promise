import { NextResponse } from "next/server";
import { z } from "zod";
import { PollRepository } from "@/lib/db/repositories/pollRepository";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
    const body = await request.json();
    const schema = z.object({
        pollId: z.string(),
        optionId: z.number(),
    });

    try {
        const { pollId, optionId } = schema.parse(body);

        const poll = await PollRepository.getPollById(pollId);
        if (!poll) {
            return NextResponse.json(
                { error: "Poll not found" },
                { status: 404 }
            );
        }

        const vote = await PollRepository.voteOnPoll(pollId, optionId);
        if (!vote) {
            return NextResponse.json(
                { error: "Failed to cast vote" },
                { status: 500 }
            );
        }

        return NextResponse.json({ vote });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
    }
}
