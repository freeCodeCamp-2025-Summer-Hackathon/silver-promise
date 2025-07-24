import { SSEService } from "@/lib/services/sseService";
import { Poll, BasePollData, PollResult } from "@/lib/types/Poll";
import PollModel from "../models/Poll";

export class PollRepository {
    static async getPollById(pollId: number): Promise<PollResult | null> {
        const poll = await PollModel.findOne({ id: pollId });
        if (!poll) {
            return null;
        }

        const results = poll.options.map((option: { text: string; votes: number }, index: number) => ({
            id: index + 1,
            text: option.text,
            voteCount: option.votes,
            color: `bg-color-${index + 1}`
        }));

        return {
            id: poll.id,
            question: poll.question,
            description: poll.description,
            title: poll.title,
            results: results,
            options: poll.options.map((option: { text: string; votes: number }, index: number) => ({
                id: index + 1,
                text: option.text
            })),
        };
    }

    static async voteOnPoll(
        pollId: number,
        optionId: number
    ): Promise<boolean> {
        if (!pollId || !optionId) {
            return false;
        }

        const poll = await PollModel.findOne({ id: pollId });
        if (!poll) {
            return false;
        }

        poll.options.forEach((option: { text: string; votes: number }, index: number) => {
            if (index + 1 === optionId) {
                option.votes += 1;
                poll.markModified("options");
            }
        });

        if (!poll.isModified()) {
            return false;
        }

        await poll.save();

        SSEService.broadcastToTopic(
            `poll:${pollId}`,
            "poll_update",
            poll
        );
        return true;
    }

    static async getPollsByUserId(userId: number): Promise<Poll[]> {
        if (!userId) {
            return [];
        }

        const pollsFromDb = await PollModel.find({ authorId: userId });
        if (!pollsFromDb || pollsFromDb.length === 0) {
            return [];
        }

        const polls: Poll[] = [];

        for (const poll of pollsFromDb) {
            const PollData: Poll = {
                id: poll.id,
                question: poll.question,
                description: poll.description,
                title: poll.title,
                status: poll.createdAt < new Date().getTime() - 7 * 24 * 60 * 60 * 1000 ? "completed" : "pending",
                createdAt: poll.createdAt,
                authorId: poll.authorId,
                results: poll.options.map((option: { text: string; votes: number }, index: number) => ({
                    id: index + 1,
                    text: option.text,
                    voteCount: option.votes,
                    color: `bg-color-${index + 1}`
                })),
                options: poll.options.map((option: { text: string }, index: number) => ({
                    id: index + 1,
                    text: option.text
                })),
            };

            polls.push(PollData);
        }
        return polls;
    }

    static async getOptionsByPollId(
        pollId: number
    ): Promise<BasePollData | null> {
        if (!pollId) {
            return null;
        }

        const poll = await PollModel.findOne({ id: pollId });

        if (!poll) {
            return null;
        }

        const pollData: BasePollData = {
            id: poll.id,
            title: poll.title,
            question: poll.question,
            description: poll.description,
            options: poll.options.map((option: { text: string }, index: number) => ({
                id: index + 1,
                text: option.text
            })),
        };

        return pollData;
    };

    static async getPollIdBySlug(slug: string): Promise<number | null> {
        if (!slug) {
            return null;
        }

        const id = (await PollModel.findOne({ pollLinks: slug })).id;

        if (!id) {
            return null;
        }

        return id;
    }
}
