"use client";

import { EditIcon } from "@/public/svgs/edit";
import { DeleteIcon } from "@/public/svgs/delete";
import { ShareIcon } from "@/public/svgs/share";

import { Poll, PollType } from "@/lib/types/Poll";

interface PollListProps {
    allPolls: Poll[];
    setAllPolls: (polls: Poll[]) => void;
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
    const handleDeletePoll = async (pollId: number) => {
        const isConfirmed = window.confirm(
            "Are you sure you want to delete this poll?"
        );
        if (isConfirmed) {
            await fetch(`/api/polls/${pollId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${
                        document.cookie
                            .split("; ")
                            .find((cookie) =>
                                cookie.trim().startsWith("auth-token=")
                            )
                            ?.split("=")[1] || ""
                    }`,
                },
            });
            setAllPolls(allPolls.filter((poll) => poll.id !== pollId));
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
                        {poll.title || "Untitled Poll"}
                    </summary>

                    <div>
                        <p className="text-foreground mb-2 mt-4">
                            {poll.question}
                        </p>
                        <p className="text-cards-foreground">
                            {poll.description}
                        </p>
                    </div>

                    <div className="text-dark-gray mt-4 flex flex-col gap-2 text-sm">
                        {poll.type === PollType.SINGLE &&
                            poll.options.map((option) => (
                                <div
                                    key={option.id}
                                    className="flex items-center"
                                >
                                    <input
                                        type="radio"
                                        id={`${poll.question}-${option.id}`}
                                        name={`poll-option-${poll.question}`}
                                        value={option.text}
                                        className="mr-2"
                                    />
                                    <label
                                        htmlFor={`${poll.question}-${option.id}`}
                                    >
                                        {option.text}
                                    </label>
                                </div>
                            ))}
                        {poll.type === PollType.MULTIPLE &&
                            poll.options.map((option) => (
                                <div
                                    key={option.id}
                                    className="flex items-center"
                                >
                                    <input
                                        type="checkbox"
                                        id={`${poll.question}-${option.id}`}
                                        name={`poll-option-${poll.question}`}
                                        value={option.text}
                                        className="mr-2"
                                    />
                                    <label
                                        htmlFor={`${poll.question}-${option.id}`}
                                    >
                                        {option.text}
                                    </label>
                                </div>
                            ))}
                    </div>
                    <div className="text-dark-gray mt-6 flex items-center justify-between text-xs">
                        <div>
                            <p className="text-xs">
                                {(() => {
                                    const diff = Date.now() - new Date(poll.createdAt).getTime();
                                    const seconds = Math.floor(diff / 1000);
                                    const minutes = Math.floor(seconds / 60);
                                    const hours = Math.floor(minutes / 60);
                                    const days = Math.floor(hours / 24);

                                    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
                                    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
                                    if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
                                    return "just now";
                                })()}
                            </p>
                        </div>
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
                                    const shareableLink = `${window.location.origin}/vote/poll-${poll.id}`;
                                    navigator.clipboard.writeText(
                                        shareableLink
                                    );
                                }}
                            >
                                <ShareIcon />
                            </button>
                            <button
                                className="block h-5 w-5"
                                type="button"
                                onClick={() => handleDeletePoll(poll.id)}
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
