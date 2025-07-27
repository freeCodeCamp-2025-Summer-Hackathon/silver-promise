"use client";

import { PrimaryButtonWithArrowRight } from "@/app/ui-components/buttons/PrimaryButton";
import { PollRepository } from "@/lib/db/repositories/pollRepository";
import { BasePollData } from "@/lib/types/Poll";
import { PollData, PollTypes } from "@/lib/types/PollTypes";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface PollDetailProps {
    pollId?: string;
}

export default function PollDetailPage({
    pollId: propPollId,
}: PollDetailProps = {}) {
    const params = useParams<{ slug: string }>();

    const pollId = propPollId || params.slug;
    const [submitting, setSubmitting] = useState(false);
    const [voteData, setVoteData] = useState<PollData | null>(null);

    useEffect(() => {
        const fetchPollData = async () => {
            const pollData = await PollRepository.getPollById(pollId);

            setVoteData(pollData);

            console.log(pollData);
        };

        if (pollId) {
            fetchPollData();
        }
        // setPoll({
        //     id: 1,
        //     title: "Dev Direction Poll",
        //     description: "Help us decide which area to improve next.",
        //     question: "Which part of the app should we improve?",
        //     options: [
        //         { id: 1, text: "Login / Signup flow" },
        //         { id: 2, text: "Poll Creation UX" },
        //         { id: 3, text: "Voting Page Design" },
        //         { id: 4, text: "Results & Analytics" },
        //     ],
        // });
        // async function fetchPoll() {
        //     const response = await fetch("/api/polls/" + pollId);
        //     const data = await response.json();
        //     setPoll(data.poll);
        // }

        // fetchPoll();
    }, [pollId]);

    const handleVote = (optionId: number) => {
        if (!optionId) {
            toast.error("Please select an option to vote!");
            return;
        }
        setSubmitting(true);
        setTimeout(() => {
            toast.success("✅ Vote submitted!");
            setSubmitting(false);
        }, 700);
    };

    if (!voteData) {
        return (
            <div className="flex h-screen items-center justify-center">
                <p className="text-lg">Loading poll details...</p>
            </div>
        );
    }

    const borderColors = [
        "#E04E51",
        "#09C9DB",
        "#2DC72D",
        "#C6B150",
        "#8350C6",
    ];

    return (
        <div className="w-full">
            {/* Sidebar */}
            {/* <SideNavbar /> */}

            {/* Main Content */}
            <section className="bg-panel-background rounded-2xl">
                <div className="flex w-full flex-col gap-6">
                    {/* Page Header */}
                    <div>
                        <h1 className="text-2xl font-bold">Poll Voting</h1>
                        <p className="text-cards-foreground text-sm">
                            Choose one option below
                        </p>
                    </div>

                    {/* Poll Container */}
                    <div className="flex gap-6">
                        <div className="mb-6 w-1/2 rounded-lg border border-gray-100 bg-white p-6">
                            <h3 className="cursor-pointer text-xl">
                                {voteData?.title}
                            </h3>

                            <div>
                                <p className="text-cards-foreground text-sm">
                                    {voteData?.description}
                                </p>
                            </div>

                            <div className="text-dark-gray mt-6 flex flex-col gap-4 text-sm">
                                {/* Map over each question */}
                                {voteData?.questions.map((question, qIndex) => (
                                    <div
                                        key={question.id || qIndex}
                                        className="mb-6"
                                    >
                                        <p className="text-foreground mb-6 text-xl font-semibold">
                                            {question.question}
                                        </p>

                                        <div className="text-dark-gray flex flex-col gap-6 text-sm">
                                            {/* Single Choice */}
                                            {question.type ===
                                                PollTypes.SINGLE && (
                                                <>
                                                    {question.options.map(
                                                        (option, sIndex) => (
                                                            <div
                                                                style={{
                                                                    outlineColor:
                                                                        borderColors[
                                                                            sIndex
                                                                        ] ?? "",
                                                                }}
                                                                key={option.id}
                                                                className="outline-table-divider pz-4 group flex items-center rounded-xl px-4 outline hover:outline-2"
                                                            >
                                                                <input
                                                                    type="radio"
                                                                    id={`q-${question.id}-opt-${option.id}`}
                                                                    name={`poll-${question.id}-question-${question.id}`}
                                                                    value={
                                                                        option.value
                                                                    }
                                                                    className="mr-2"
                                                                />
                                                                <label
                                                                    htmlFor={`q-${question.id}-opt-${option.id}`}
                                                                    className="w-full cursor-pointer p-4"
                                                                >
                                                                    {
                                                                        option.label
                                                                    }
                                                                </label>
                                                            </div>
                                                        )
                                                    )}
                                                </>
                                            )}

                                            {/* Multiple Choice */}
                                            {question.type ===
                                                PollTypes.MULTIPLE && (
                                                <>
                                                    {question.options.map(
                                                        (option, index) => (
                                                            <div
                                                                key={option.id}
                                                                style={{
                                                                    outlineColor:
                                                                        borderColors[
                                                                            index
                                                                        ] ?? "",
                                                                }}
                                                                className="outline-table-divider group flex items-center rounded-xl px-4 outline hover:outline-2"
                                                            >
                                                                <input
                                                                    type="checkbox"
                                                                    id={`q-${question.id}-opt-${option.id}`}
                                                                    name={`value`}
                                                                    value={
                                                                        option.value
                                                                    }
                                                                    className="mr-2"
                                                                />
                                                                <label
                                                                    htmlFor={`q-${question.id}-opt-${option.id}`}
                                                                    style={{
                                                                        color:
                                                                            borderColors[
                                                                                index
                                                                            ] ??
                                                                            "black",
                                                                    }}
                                                                    className="group-hover:border-dark-gray w-full cursor-pointer p-4"
                                                                >
                                                                    {
                                                                        option.label
                                                                    }
                                                                </label>
                                                            </div>
                                                        )
                                                    )}
                                                </>
                                            )}

                                            {/* Open Ended */}
                                            {question.type ===
                                                PollTypes.OPEN && (
                                                <textarea
                                                    rows={4}
                                                    className="w-full rounded border p-2"
                                                    placeholder="Your answer..."
                                                    name="open"
                                                />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="text-dark-gray mt-6 flex items-center justify-between text-xs">
                                <div>
                                    {voteData?.endAt && (
                                        <div>
                                            <p>Expires on</p>
                                            <p>
                                                {voteData?.endAt
                                                    ? new Date(
                                                          voteData?.endAt
                                                      ).toDateString()
                                                    : ""}
                                            </p>
                                        </div>
                                    )}
                                </div>
                                <div className="w-2/4">
                                    <PrimaryButtonWithArrowRight
                                        label="Submit poll"
                                        type="button"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mb-6 w-1/2 rounded-lg border border-gray-100 bg-white p-4">
                            <div className="space-y-4">
                                <h3>Votes</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
