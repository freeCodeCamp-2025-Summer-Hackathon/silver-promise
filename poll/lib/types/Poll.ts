export interface PollResult {
    id: number;
    title: string;
    question: string;
    description: string;
    results: {
        id: number;
        text: string;
        voteCount: number;
        color: string;
    }[];
}

export type Poll = PollResult & {
    status: string;
    createdAt: Date;
    authorId: number;
};
