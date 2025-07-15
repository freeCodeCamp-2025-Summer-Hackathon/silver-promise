export enum PollTypes {
    SINGLE = "single-choice",
    MULTIPLE = "multi-choice",
    OPEN = "open",
}

export interface PollData {
    pollTitle: string;
    pollDescription: string;
    pollQuestion: string;
    pollType: PollTypes | "";
    pollOptions: PollOption[];
}

export interface PollOption {
    id: string;
    label: string;
    value: string;
}
