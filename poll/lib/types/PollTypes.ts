export enum PollTypes {
    SINGLE = "SINGLECHOICE",
    MULTIPLE = "MULTIPLECHOICE",
    OPEN = "OPENENDED",
}

export interface PollData {
    id?: number;
    title: string;
    description: string;
    questions: PollQuestionData[];
    author?: string;
    userId?: number;
    isPublic?: boolean;
    startAt?: string;
    endAt?: string;
    links?: PollLink[];
}

export interface PollQuestionData {
    id?: number;
    question: string;
    type: PollTypes | "";
    options: PollOption[];
    position?: number;
    isRequired?: boolean;
}

export interface PollFormData {
    id?: number;
    title: string;
    description: string;
    questions: PollQuestionFormData[];
    endAt?: string;
    startAt?: string;
    userId?: number;
    isPublic?: boolean;
}

export interface PollAnswer {
    id?: number;
    questionId: number;
    userId?: number;
    answer: string | string[];
    sentAt: string;
}

export interface PollSubmissionData {
    slug: string;
    answers: PollAnswer[];
}

export interface PollQuestionFormData {
    id?: number;
    question: string;
    type: PollTypes | "";
    options: PollOption[];
}

export interface PollLink {
    id?: number;
    pollId: number;
    slug: string;
    createdAt?: Date;
    expiresAt?: Date;
}

export interface PollOption {
    id: string;
    label: string;
    value: string;
}
