"use client";

import { EditIcon } from "@/public/svgs/edit";
import { DeleteIcon } from "@/public/svgs/delete";
import { ShareIcon } from "@/public/svgs/share";
// import { toast } from "react-toastify";
// import Link from "next/link";

import { PollData, PollTypes } from "@/lib/types/PollTypes";

interface PollListProps {
    allPolls: PollData[];
    setAllPolls: (polls: PollData[]) => void;
    handleUpdateCreatedPoll: (index: number) => void;
}

/**
 *
 * @param allPoll An array of PollData
 * @param setAllPolls setStateAction updates the PollData in the allPoll array
 * @param handleUpdateCreatedPoll this function takes in the index of the PollData the user intends to update as argument
 * then apply the updates to the PollData
 * @description: This function takes in argument props from the parent create-poll
 * then renders the entire list of polls
 */

export const PollList = ({
    allPolls,
    setAllPolls,
    handleUpdateCreatedPoll,
}: PollListProps) => {
    //create a local function to handle poll deletion
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

    // This passes the index of the current poll that the user wants to edit
    // to the handleUpdateCreatedPoll function, which then initiates the update process.
    const handleUpdateWhenClick = (index: number) => {
        handleUpdateCreatedPoll(index);
    };

    return (
        <div>
            <h2 className="text-section-header mb-4 font-bold">Polls</h2>
            {allPolls.map((poll, index) => (
                <details
                    key={index}
                    className="mb-6 rounded-lg border border-gray-100 p-4"
                >
                    <summary className="cursor-pointer font-semibold">
                        {poll.title}
                    </summary>

                    <div>
                        <p className="text-cards-foreground">
                            {poll.description}
                        </p>
                    </div>

                    <div className="text-dark-gray mt-4 flex flex-col gap-2 text-sm">
                        {poll.questions.map((question, qIndex) => (
                            <>
                                {question.type === PollTypes.SINGLE &&
                                    question.options.map((option) => (
                                        <div
                                            key={option.id}
                                            className="flex items-center"
                                        >
                                            <input
                                                type="radio"
                                                id={`${question.question}-${option.id}`}
                                                name={`poll-option-${question.question}`}
                                                value={option.value}
                                                className="mr-2"
                                            />
                                            <label
                                                htmlFor={`${question.question}-${option.id}`}
                                            >
                                                {option.label}
                                            </label>
                                        </div>
                                    ))}
                                {question.type === PollTypes.MULTIPLE &&
                                    question.options.map((option) => (
                                        <div
                                            key={option.id}
                                            className="flex items-center"
                                        >
                                            <input
                                                type="checkbox"
                                                id={`${question.question}-${option.id}`}
                                                name={`poll-option-${question.question}`}
                                                value={option.value}
                                                className="mr-2"
                                            />
                                            <label
                                                htmlFor={`${question.question}-${option.id}`}
                                            >
                                                {option.label}
                                            </label>
                                        </div>
                                    ))}
                                {question.type === PollTypes.OPEN && (
                                    <textarea
                                        rows={4}
                                        className="w-full rounded border p-2"
                                        placeholder="Your answer..."
                                    ></textarea>
                                )}
                            </>
                        ))}
                    </div>
                    <div className="text-dark-gray mt-6 flex items-center justify-between text-xs">
                        <div>3hrs ago</div>
                        <div className="flex items-center gap-4">
                            <button
                                type="button"
                                className="h-5 w-5"
                                onClick={() => handleUpdateWhenClick(index)}
                            >
                                <EditIcon />
                            </button>
                            <button
                                className="h-5 w-5"
                                onClick={() => {
                                    const shareableLink = `${window.location.origin}/dashboard/polls/votes/${encodeURIComponent(poll.title.trim())}`;
                                    navigator.clipboard.writeText(
                                        shareableLink
                                    );
                                    // alert("Link copied to clipboard!");
                                }}
                            >
                                <ShareIcon />
                            </button>
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
