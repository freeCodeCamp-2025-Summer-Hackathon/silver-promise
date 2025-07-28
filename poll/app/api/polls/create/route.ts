import { getUserFromRequest } from "@/lib/auth/server";
import { PollRepository } from "@/lib/db/repositories/pollRepository";
import { Poll, PollType } from "@/lib/types/Poll";

export async function POST(request: Request) {
    const { title, description, options, question, type } =
        await request.json();
    const typeR: PollType = (type as PollType) || PollType.SINGLE;
    const user = getUserFromRequest(request);

    if (!user) {
        return Response.json(
            { success: false, message: "User not authenticated" },
            { status: 401 }
        );
    }

    if (!question || !options || options.length < 2) {
        return Response.json(
            { success: false, message: "Invalid poll data" },
            { status: 400 }
        );
    }

    const newPoll = await PollRepository.createPoll(
        {
            id: new Date().getTime(),
            title: title || "Untitled Poll",
            description,
            question,
            options: options.map((option: { text: string }) => ({
                text: option.text,
                votes: 0,
            })),
            type: typeR,
        },
        user.userId
    );

    if (!newPoll) {
        return Response.json(
            { success: false, message: "Failed to create poll" },
            { status: 500 }
        );
    }

    const nPoll: Poll = {
        id: newPoll.id,
        title: newPoll.title,
        question: newPoll.question,
        description: newPoll.description,
        options: newPoll.options.map((option) => ({
            id: option.id,
            text: option.text,
        })),
        type: newPoll.type,
        results: [],
        status: "active",
        createdAt: newPoll.createdAt,
        authorId: user.userId,
    };

    return Response.json(
        { success: true, poll: { ...nPoll } },
        { status: 201 }
    );
}
