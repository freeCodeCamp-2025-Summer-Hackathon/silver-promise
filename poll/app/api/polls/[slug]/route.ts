import { NextRequest, NextResponse } from "next/server";
import { PollRepository } from "@/lib/db/repositories/pollRepository";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    const awaitedParams = await params;
    const pollId = awaitedParams.slug;

    const poll = await PollRepository.getOptionsByPollId(Number(pollId));
    if (!poll) {
        return NextResponse.json({ error: "Poll not found" }, { status: 404 });
    }

    return NextResponse.json({ poll });
}
