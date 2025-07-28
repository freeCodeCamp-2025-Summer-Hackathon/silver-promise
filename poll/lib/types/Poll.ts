export interface PollResult extends BasePollData {
    results: {
        id: number;
        text: string;
        voteCount: number;
        color: string;
    }[];
}

export interface PollEditingPayload {
    id: number;
    title: string;
    description: string;
    question: string;
    options: PollOption[];
    type: PollType;
}

export interface Poll extends PollResult {
    status: string;
    createdAt: Date;
    authorId: number;
}

export interface PollOption {
    id: number;
    text: string;
}
export interface PollDetails {
    id: number;
    title: string;
    question: string;
    description: string;
    options: PollOption[];
}
export interface PollVote {
    pollId: number;
    optionId: string;
}

export interface BasePollData {
    id: number;
    title: string;
    question: string;
    description: string;
    options: PollOption[];
    type: PollType;
}

export enum PollType {
    SINGLE = "single",
    MULTIPLE = "multiple",
}
