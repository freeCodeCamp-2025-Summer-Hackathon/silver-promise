import { PollData } from "@/lib/types/PollTypes";

// Mock API functions
export const mockApi = {
    // BUG: localStorage is not defined because this is running on the server side
    getPolls: async (): Promise<PollData[]> => {
        return [];
    },
    getPollsById: async (id: string): Promise<PollData[]> => {
        const existingPolls = await mockApi.getPolls();

        const pollById = existingPolls.filter((poll) => poll.title === id);

        return pollById;
    },
    createPoll: async (pollData: PollData): Promise<PollData> => {
        const existingPolls = await mockApi.getPolls();
        const updatedPolls = [...existingPolls, pollData];
        localStorage.setItem("createpolldata", JSON.stringify(updatedPolls));
        return pollData;
    },
    updatePoll: async (updatedPoll: PollData): Promise<void> => {
        const existingPolls = await mockApi.getPolls();
        const updatedPolls = existingPolls.map((poll) =>
            poll.title === updatedPoll.title ? updatedPoll : poll
        );
        localStorage.setItem("createpolldata", JSON.stringify(updatedPolls));
    },
};
