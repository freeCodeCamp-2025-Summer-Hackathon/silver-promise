import { NextResponse } from "next/server";
import { PollRepository } from "@/lib/db/repositories/pollRepository";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
    const body = await request.json();
    const { pollId, optionId } = body;
    let { optionIds } = body;

    if (!pollId || (!optionId && !optionIds)) {
        return NextResponse.json(
            { error: "Poll ID and Option ID are required" },
            { status: 400 }
        );
    }

    if (optionIds && !Array.isArray(optionIds)) {
        return NextResponse.json(
            { error: "Option IDs must be an array" },
            { status: 400 }
        );
    }

    try {
        const poll = await PollRepository.getPollById(Number(pollId));
        if (!poll) {
            return NextResponse.json(
                { error: "Poll not found" },
                { status: 404 }
            );
        }

        optionIds = optionIds || [optionId];


        const vote = await PollRepository.voteOnPoll(pollId, undefined, optionIds);
        if (!vote) {
            return NextResponse.json({ error: "Bad Request" }, { status: 400 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error processing vote:", error);
        return NextResponse.json(
            { error: "Failed to process vote" },
            { status: 500 }
        );
    }
}
