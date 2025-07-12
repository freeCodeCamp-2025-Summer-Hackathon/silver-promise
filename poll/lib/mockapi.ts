import { pollData } from "./types/polltypes";

// Mock API functions
export const mockApi = {
    getPolls: async (): Promise<pollData[]> => {
        const savedPolls = localStorage.getItem("createpolldata");
        if (savedPolls) {
            return JSON.parse(savedPolls);
        }
        return [];
    },
    getPollsById: async (id: string): Promise<pollData[]> => {
        const existingPolls = await mockApi.getPolls();

        const pollById = existingPolls.filter((poll) => poll.pollTitle === id);

        return pollById;
    },
    createPoll: async (pollData: pollData): Promise<pollData> => {
        const existingPolls = await mockApi.getPolls();
        const updatedPolls = [...existingPolls, pollData];
        localStorage.setItem("createpolldata", JSON.stringify(updatedPolls));
        return pollData;
    },
    updatePoll: async (updatedPoll: pollData): Promise<void> => {
        const existingPolls = await mockApi.getPolls();
        const updatedPolls = existingPolls.map((poll) =>
            poll.pollTitle === updatedPoll.pollTitle ? updatedPoll : poll
        );
        localStorage.setItem("createpolldata", JSON.stringify(updatedPolls));
    },
};
