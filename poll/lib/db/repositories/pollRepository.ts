import { SSEService } from "@/lib/services/sseService";
import { Poll, BasePollData, PollResult } from "@/lib/types/Poll";
import { PollData } from "@/lib/types/PollTypes";

export class PollRepository {
    static async createPoll(pollData: PollData): Promise<PollData> {
        const response = await fetch("/api/polls/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(pollData),
        });

        const polls = await response.json();

        console.log(polls);

        return polls.poll;
    }

    static async getPollById(slug: string): Promise<PollData | null> {
        // if (!pollId) {
        //     return null;
        // }

        // return {
        //     id: 1,
        //     question: "What part of the application would you like to work on?",
        //     description: "A poll about user dev preference",
        //     title: "Poll Result",
        //     results: [
        //         { id: 1, text: "Frontend", voteCount: 99, color: "bg-red-400" },
        //         { id: 2, text: "Backend", voteCount: 36, color: "bg-cyan-400" },
        //         {
        //             id: 3,
        //             text: "I can do both",
        //             voteCount: 25,
        //             color: "bg-gray-300",
        //         },
        //     ],
        //     options: [
        //         { id: 1, text: "Frontend" },
        //         { id: 2, text: "Backend" },
        //         { id: 3, text: "I can do both" },
        //     ],
        // };

        try {
            const response = await fetch(
                `/api/polls/getsinglepoll?slug=${slug}`,
                {
                    method: "GET",
                }
            );

            if (!response.ok) {
                throw new Error(
                    `API call failed with status: ${response.status}`
                );
            }

            const pollData = await response.json();

            console.log({ pollData });

            return pollData.data;
        } catch (error) {
            console.error(error);
            throw new Error("Error fetching user poll");
        }
    }

    static async voteOnPoll(
        pollId: string, //pollId here is supposed to be a number, well i guess pollId should actually be replaced with slug
        optionId: number
    ): Promise<boolean> {
        if (!pollId || !optionId) {
            return false;
        }

        const poll = await this.getPollById(pollId);
        if (!poll) {
            return false;
        }

        const updatedPoll = {
            ...poll,
            //@ts-expect-error poll here returning an object instead of an array
            results: poll.results.map((result) =>
                result.id === optionId
                    ? { ...result, voteCount: result.voteCount + 1 }
                    : result
            ),
        };

        if (updatedPoll == poll) {
            return false;
        }

        SSEService.broadcastToTopic(
            `poll:${pollId}`,
            "poll_update",
            updatedPoll
        );
        return true;
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
                options: [
                    { id: 1, text: "Option 1" },
                    { id: 2, text: "Option 2" },
                    { id: 3, text: "Option 3" },
                ],
            };
            polls.push(poll);
        }

        // Placeholder for actual database call
        return polls;
    }

    static async getOptionsByPollId(
        pollId: number
    ): Promise<BasePollData | null> {
        if (!pollId) {
            return null;
        }

        return {
            id: pollId,
            title: "Sample Poll",
            description: "This is a sample poll description.",
            question: "What is your favorite programming language?",
            options: [
                { id: 1, text: "JavaScript" },
                { id: 2, text: "Python" },
                { id: 3, text: "Java" },
                { id: 4, text: "C#" },
            ],
        };
    }

    static async getPollIdBySlug(slug: string): Promise<number | null> {
        if (!slug) {
            return null;
        }

        // Placeholder for actual database call
        return 1;
    }
}
