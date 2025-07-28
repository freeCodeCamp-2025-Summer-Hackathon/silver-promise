import { NextRequest, NextResponse } from "next/server";
import { PollRepository } from "@/lib/db/repositories/pollRepository";
import { AuthService } from "@/lib/services/authService";

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

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    const awaitedParams = await params;
    const pollId = awaitedParams.slug;

    // Get the Authorization header
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return new Response("Missing or invalid Authorization header", {
            status: 401,
        });
    }

    // Extract the token from the header
    const token = authHeader.replace("Bearer ", "").trim();

    if (!token) {
        return new Response("Token is required", { status: 400 });
    }

    const user = AuthService.resolveUserFromToken(token);

    if (!user) {
        return new Response("Invalid token", { status: 401 });
    }

    // Check if the poll exists and belongs to the user
    const poll = await PollRepository.getFullPollById(Number(pollId));
    if (!poll) {
        return new Response("Poll not found", { status: 404 });
    }

    if (poll.authorId !== user.id) {
        return new Response("You are not authorized to delete this poll", {
            status: 403,
        });
    }

    // Delete the poll
    const deleted = await PollRepository.deletePoll(Number(pollId));
    if (!deleted) {
        return new Response("Failed to delete poll", { status: 500 });
    }

    return new Response(JSON.stringify(poll), { status: 200 });
}
