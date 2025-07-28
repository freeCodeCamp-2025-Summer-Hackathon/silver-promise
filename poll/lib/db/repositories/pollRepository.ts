import { SSEService } from "@/lib/services/sseService";
import {
    Poll,
    BasePollData,
    PollResult,
    PollOption,
    PollType,
} from "@/lib/types/Poll";
import PollModel from "../models/Poll";

export class PollRepository {
    static async deletePoll(pollId: number): Promise<boolean> {
        const result = await PollModel.deleteOne({ id: pollId });
        return result.deletedCount === 1;
    }

    static async updatePoll(
        pollId: number,
        updatedPollData: {
            title: string;
            description: string;
            question: string;
            options: PollOption[];
            type: PollType;
        }
    ): Promise<BasePollData | null> {
        const poll = await PollModel.findOne({ id: pollId });
        if (!poll) {
            return null;
        }

        poll.title = updatedPollData.title;
        poll.description = updatedPollData.description;
        poll.question = updatedPollData.question;
        poll.options = updatedPollData.options
            .sort((a, b) => a.id - b.id)
            .map((option) => ({
                text: option.text,
                votes: poll.options[option.id]?.votes || 0,
            }));
        poll.type = updatedPollData.type || PollType.SINGLE;
        poll.markModified();
        await poll.save();

        return {
            id: poll.id,
            question: poll.question,
            description: poll.description,
            title: poll.title,
            options: poll.options.map(
                (option: { text: string }, index: number) => ({
                    id: index + 1,
                    text: option.text,
                })
            ),
            type: poll.type,
        };
    }
    static async getPollById(pollId: number): Promise<PollResult | null> {
        const poll = await PollModel.findOne({ id: pollId });
        if (!poll) {
            return null;
        }

        const results = poll.options.map(
            (option: { text: string; votes: number }, index: number) => ({
                id: index + 1,
                text: option.text,
                voteCount: option.votes,
                color: `bg-color-${index + 1}`,
            })
        );

        return {
            id: poll.id,
            question: poll.question,
            description: poll.description,
            title: poll.title,
            results: results,
            options: poll.options.map(
                (option: { text: string; votes: number }, index: number) => ({
                    id: index + 1,
                    text: option.text,
                })
            ),
            type: poll.type,
        };
    }

    static async getFullPollById(pollId: number): Promise<Poll | null> {
        const poll = await PollModel.findOne({ id: pollId });
        if (!poll) {
            return null;
        }

        const results = poll.options.map(
            (option: { text: string; votes: number }, index: number) => ({
                id: index + 1,
                text: option.text,
                voteCount: option.votes,
                color: `bg-color-${index + 1}`,
            })
        );

        return {
            id: poll.id,
            question: poll.question,
            description: poll.description,
            title: poll.title,
            results: results,
            options: poll.options.map(
                (option: { text: string; votes: number }, index: number) => ({
                    id: index + 1,
                    text: option.text,
                })
            ),
            type: poll.type as PollType,
            status: poll.status || "pending",
            createdAt: poll.createdAt,
            authorId: poll.authorId,
        };
    }

    static async voteOnPoll(
        pollId: number,
        optionId?: number,
        optionIds?: number[]
    ): Promise<boolean> {
        if (!pollId || (!optionId && !optionIds)) {
            return false;
        }

        const poll = await PollModel.findOne({ id: pollId });
        if (!poll) {
            return false;
        }

        poll.options.forEach(
            (option: { text: string; votes: number }, index: number) => {
                if (optionIds?.includes(index + 1) || optionId === index + 1) {
                    option.votes += 1;
                    poll.markModified();
                }
            }
        );

        if (!poll.isModified()) {
            return false;
        }

        await poll.save();

        SSEService.broadcastToTopic(`poll:${pollId}`, "poll_update", poll);
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
                status:
                    poll.createdAt <
                    new Date().getTime() - 7 * 24 * 60 * 60 * 1000
                        ? "completed"
                        : "pending",
                createdAt: poll.createdAt,
                authorId: poll.authorId,
                results: poll.options.map(
                    (
                        option: { text: string; votes: number },
                        index: number
                    ) => ({
                        id: index + 1,
                        text: option.text,
                        voteCount: option.votes,
                        color: `bg-color-${index + 1}`,
                    })
                ),
                options: poll.options.map(
                    (option: { text: string }, index: number) => ({
                        id: index + 1,
                        text: option.text,
                    })
                ),
                type: poll.type as PollType,
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
            options: poll.options.map(
                (option: { text: string }, index: number) => ({
                    id: index + 1,
                    text: option.text,
                })
            ),
            type: poll.type as PollType,
        };

        return pollData;
    }

    static async getPollIdBySlug(slug: string): Promise<number | null> {
        if (!slug) {
            return null;
        }

        const id = (await PollModel.findOne({ pollLinks: slug }))?.id;

        if (!id) {
            return null;
        }

        return id;
    }

    static async createPoll(
        pollData: BasePollData,
        userId: number
    ): Promise<Poll | null> {
        if (!pollData || !userId) {
            return null;
        }

        const pollId = new Date().getTime();

        let randomSlug = Math.random().toString(36).substring(2, 10);
        let existingPoll = await PollModel.findOne({ pollLinks: randomSlug });

        while (existingPoll) {
            randomSlug = Math.random().toString(36).substring(2, 10);
            existingPoll = await PollModel.findOne({ pollLinks: randomSlug });
        }

        const newPoll = new PollModel({
            ...pollData,
            id: pollId,
            authorId: userId,
            createdAt: new Date(),
            pollLinks: [
                randomSlug,
                `poll-${pollId}`,
                `poll-${pollId}-${randomSlug}`,
            ],
        });

        try {
            await newPoll.save();
            return newPoll;
        } catch (error) {
            console.error("Error creating poll:", error);
            return null;
        }
    }
}
