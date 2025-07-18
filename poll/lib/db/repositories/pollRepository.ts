import { broadcastPollUpdate } from "@/app/api/polls/[slug]/sse/route";
import { Poll, PollResult } from "@/lib/types/Poll";

export class PollRepository {
    static async getPollById(pollId: number): Promise<PollResult | null> {
        return {
            id: 1,
            question: "What part of the application would you like to work on?",
            description: "A poll about user dev preference",
            title: "Poll Result",
            results: [
                { id: 1, text: "Frontend", voteCount: 99, color: "bg-red-400" },
                { id: 2, text: "Backend", voteCount: 36, color: "bg-cyan-400" },
                {
                    id: 3,
                    text: "I can do both",
                    voteCount: 25,
                    color: "bg-gray-300",
                },
            ],
        };
    }

    static async voteOnPoll(
        pollId: string,
        optionId: number
    ): Promise<any | null> {
        // Placeholder for actual database call
        return null;
        broadcastPollUpdate(pollId, {} as PollResult);
    }

    static async getPollsByUserId(userId: number): Promise<Poll[]> {
        const polls: Poll[] = [];
        for (let i = 15; i > 0; i--) {
            const poll: Poll = {
                id: i,
                question: `Poll question ${i}`,
                description: `Poll description ${i}`,
                title: `Poll ${i}`,
                status: i % 2 === 0 ? "completed" : "pending",
                createdAt: new Date(),
                authorId: userId,
                results: [
                    {
                        id: 1,
                        text: "Option 1",
                        voteCount: 0,
                        color: "bg-red-400",
                    },
                    {
                        id: 2,
                        text: "Option 2",
                        voteCount: 0,
                        color: "bg-cyan-400",
                    },
                    {
                        id: 3,
                        text: "Option 3",
                        voteCount: 0,
                        color: "bg-gray-300",
                    },
                ],
            };
            polls.push(poll);
        }

        // Placeholder for actual database call
        return polls;
    }
}
