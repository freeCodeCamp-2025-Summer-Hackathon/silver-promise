"use client";

import { PrimaryButton } from "@/app/ui-components/buttons/PrimaryButton";
import { BasePollData, PollType } from "@/lib/types/Poll";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

export function PollDetailPageWithPollId({ pollId }: { pollId: number }) {
    const [submitting, setSubmitting] = useState(false);
    const [poll, setPoll] = useState<BasePollData | null>(null);
    const [hasVoted, setHasVoted] = useState(false);

    useEffect(() => {
        async function fetchPoll() {
            const response = await fetch("/api/polls/" + pollId);
            const data = await response.json();
            setPoll(data.poll);
        }

        fetchPoll();
        // Check if user has already voted
        const votedCookie = document.cookie
            .split("; ")
            .find((row) => row.startsWith(`voted_${pollId}=`));
        if (votedCookie) {
            setHasVoted(true);
        }
    }, [pollId]);

    const handleVote = async (optionIds: number[]) => {
        if (!optionIds.length) {
            toast.error("Please select an option to vote!");
            return;
        }
        setSubmitting(true);

        try {
            // For multiple, send all selected optionIds; for single, array of one
            const response = await fetch(`/api/polls/${pollId}/vote`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ pollId, optionIds }),
            });

            const data = await response.json();
            if (response.ok) {
                // Set Cookie that says user has voted
                document.cookie = `voted_${pollId}=${optionIds.join(",")}; path=/;`;
                setHasVoted(true);
            } else {
                toast.error(data.error || "Failed to submit vote");
            }
        } catch {
            toast.error("Failed to submit vote");
        }
        setSubmitting(false);
    };

    if (!poll) {
        return (
            <div className="flex h-screen items-center justify-center">
                <p className="text-lg">Loading poll details...</p>
            </div>
        );
    }

    function handleVoteSubmit(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        let optionIds: number[] = [];
        if (poll?.type === PollType.SINGLE) {
            const optionId = formData.get(`poll-${poll.id}-options`) as string;
            if (!optionId) {
                toast.error("Please select an option to vote!");
                return;
            }
            optionIds = [parseInt(optionId)];
        } else if (poll?.type === PollType.MULTIPLE) {
            const selected = formData.getAll(
                `poll-${poll.id}-options`
            ) as string[];
            if (!selected.length) {
                toast.error("Please select at least one option to vote!");
                return;
            }
            optionIds = selected.map((id) => parseInt(id));
        }

        handleVote(optionIds);
    }

    return (
        <div className="text-foreground flex h-screen">
            {/* Sidebar */}
            {/* <SideNavbar /> */}

            {/* Main Content */}
            <section className="bg-panel-background m-4 flex-1 rounded-2xl p-6">
                <div className="flex flex-col gap-6">
                    {/* Page Header */}
                    <div>
                        <h1 className="text-2xl font-bold">Poll Voting</h1>
                        <p className="text-cards-foreground text-sm">
                            Choose one option below
                        </p>
                    </div>

                    {/* Poll Container */}
                    {hasVoted ? (
                        <div className="bg-table-background rounded-xl p-6 text-center text-lg font-semibold shadow">
                            Thank you for voting!
                            <p className="text-cards-foreground text-sm">
                                Your vote has been recorded.
                            </p>
                        </div>
                    ) : (
                        <div className="bg-table-background max-w-3xl rounded-xl p-6 shadow">
                            <div className="mb-6 space-y-1">
                                <h2 className="text-xl font-semibold">
                                    {poll?.question}
                                </h2>
                                <p className="text-cards-foreground text-sm">
                                    {poll?.description}
                                </p>
                            </div>
                            <div className="space-y-4">
                                <form onSubmit={handleVoteSubmit}>
                                    {poll?.type === PollType.SINGLE && (
                                        <>
                                            {poll?.options.map((opt) => (
                                                <div
                                                    key={opt.id}
                                                    className="flex items-center"
                                                >
                                                    <input
                                                        type="radio"
                                                        id={`poll-${poll.id}-option-${opt.id}`}
                                                        name={`poll-${poll.id}-options`}
                                                        value={opt.id}
                                                        className="mr-2"
                                                        disabled={submitting}
                                                    />
                                                    <label
                                                        htmlFor={`poll-${poll.id}-option-${opt.id}`}
                                                        className="cursor-pointer"
                                                    >
                                                        {opt.text}
                                                    </label>
                                                </div>
                                            ))}
                                        </>
                                    )}
                                    {poll?.type === PollType.MULTIPLE && (
                                        <>
                                            {poll?.options.map((opt) => (
                                                <div
                                                    key={opt.id}
                                                    className="flex items-center"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        id={`poll-${poll.id}-option-${opt.id}`}
                                                        name={`poll-${poll.id}-options`}
                                                        value={opt.id}
                                                        className="mr-2"
                                                        disabled={submitting}
                                                    />
                                                    <label
                                                        htmlFor={`poll-${poll.id}-option-${opt.id}`}
                                                        className="cursor-pointer"
                                                    >
                                                        {opt.text}
                                                    </label>
                                                </div>
                                            ))}
                                        </>
                                    )}
                                    <div className="mt-4">
                                        <PrimaryButton
                                            disabled={submitting}
                                            label={
                                                submitting
                                                    ? "Submitting..."
                                                    : "Submit Vote"
                                            }
                                            type="submit"
                                            className="px-4"
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
