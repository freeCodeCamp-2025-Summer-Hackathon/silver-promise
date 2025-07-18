import { NextRequest, NextResponse } from "next/server";
import { PollRepository } from "@/lib/db/repositories/pollRepository";

export async function GET(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    const awaitedParams = await params;
    const pollId = awaitedParams.slug;

    if (!pollId) {
        return NextResponse.json(
            { error: "Missing poll_id parameter" },
            { status: 400 }
        );
    }

    const poll = await PollRepository.getPollById(pollId);
    if (!poll) {
        return NextResponse.json(
            { error: "Poll not found" },
            { status: 404 }
        );
    }

    return NextResponse.json({ poll });
}