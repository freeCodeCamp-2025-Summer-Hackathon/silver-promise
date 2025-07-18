export interface Poll {
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
