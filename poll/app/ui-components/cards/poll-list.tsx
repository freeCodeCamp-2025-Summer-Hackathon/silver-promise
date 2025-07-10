"use client";

import { EditIcon } from "@/public/svgs/edit";
import { DeleteIcon } from "@/public/svgs/delete";
import { ShareIcon } from "@/public/svgs/share";
// import { toast } from "react-toastify";
import Link from "next/link";

interface pollData {
    poll_title: string;
    poll_description: string;
    poll_question: string;
    poll_type: string;
    poll_options: pollOption[];
}

interface pollOption {
    id: string;
    label: string;
    value: string;
}

interface PollListProps {
    allPolls: pollData[];
    setAllPolls: (polls: pollData[]) => void;
    handleEditCreatedPoll: (index: number) => void;
}

export const PollList = ({
    allPolls,
    setAllPolls,
    handleEditCreatedPoll,
}: PollListProps) => {
    const handleDeletePoll = (index: number) => {
        const isConfirmed = window.confirm(
            "Are you sure you want to delete this poll?"
        );
        if (isConfirmed) {
            const updatedPollList = allPolls.filter((_, idx) => idx !== index);
            setAllPolls(updatedPollList);

            // update localStorage with the new list of polls
            localStorage.setItem(
                "createpolldata",
                JSON.stringify(updatedPollList)
            );
        }
    };

    const handleEditClick = (index: number) => {
        handleEditCreatedPoll(index);
    };

    return (
        <div>
            <h2 className="text-dark-gray mb-4 font-bold">Polls</h2>
            {allPolls.map((poll, index) => (
                <details
                    key={index}
                    className="mb-6 rounded-lg border border-[#e1e1e1] p-4"
                >
                    <summary className="cursor-pointer font-semibold">
                        {poll.poll_question}
                    </summary>

                    <div className="text-dark-gray mt-4 flex flex-col gap-2 text-sm">
                        {poll.poll_type === "single-choice" &&
                            poll.poll_options.map((option) => (
                                <div
                                    key={option.id}
                                    className="flex items-center"
                                >
                                    <input
                                        type="radio"
                                        id={`${poll.poll_question}-${option.id}`}
                                        name={`poll-option-${poll.poll_question}`}
                                        value={option.value}
                                        className="mr-2"
                                    />
                                    <label
                                        htmlFor={`${poll.poll_question}-${option.id}`}
                                    >
                                        {option.label}
                                    </label>
                                </div>
                            ))}
                        {poll.poll_type === "multiple-choice" &&
                            poll.poll_options.map((option) => (
                                <div
                                    key={option.id}
                                    className="flex items-center"
                                >
                                    <input
                                        type="checkbox"
                                        id={`${poll.poll_question}-${option.id}`}
                                        name={`poll-option-${poll.poll_question}`}
                                        value={option.value}
                                        className="mr-2"
                                    />
                                    <label
                                        htmlFor={`${poll.poll_question}-${option.id}`}
                                    >
                                        {option.label}
                                    </label>
                                </div>
                            ))}
                        {poll.poll_type === "open-ended" && (
                            <textarea
                                rows={4}
                                className="w-full rounded border p-2"
                                placeholder="Your answer..."
                            ></textarea>
                        )}
                    </div>
                    <div className="text-dark-gray mt-6 flex items-center justify-between text-xs">
                        <div>3hrs ago</div>
                        <div className="flex items-center gap-4">
                            <button
                                className="h-5 w-5"
                                onClick={() => handleEditClick(index)}
                            >
                                <EditIcon />
                            </button>
                            <Link
                                href={`/dashboard/polls/votes/${encodeURIComponent(poll.poll_title.trim())}`}
                                className="block h-5 w-5"
                                type="button"
                            >
                                <ShareIcon />
                            </Link>
                            <button
                                className="block h-5 w-5"
                                type="button"
                                onClick={() => handleDeletePoll(index)}
                            >
                                {" "}
                                <DeleteIcon />
                            </button>
                        </div>
                    </div>
                </details>
            ))}
        </div>
    );
};
