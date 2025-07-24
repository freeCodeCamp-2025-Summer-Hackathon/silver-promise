"use client";

import { BasePollData } from "@/lib/types/Poll";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface PollDetailProps {
    pollId?: number;
}

export default function PollDetailPage({
    pollId: propPollId,
}: PollDetailProps = {}) {
    const params = useParams<{ slug: string }>();

    const pollId = propPollId || params.slug;
    const [submitting, setSubmitting] = useState(false);
    const [poll, setPoll] = useState<BasePollData | null>(null);

    useEffect(() => {
        setPoll({
            id: 1,
            title: "Dev Direction Poll",
            description: "Help us decide which area to improve next.",
            question: "Which part of the app should we improve?",
            options: [
                { id: 1, text: "Login / Signup flow" },
                { id: 2, text: "Poll Creation UX" },
                { id: 3, text: "Voting Page Design" },
                { id: 4, text: "Results & Analytics" },
            ],
        });
        async function fetchPoll() {
            const response = await fetch("/api/polls/" + pollId);
            const data = await response.json();
            setPoll(data.poll);
        }

        fetchPoll();
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

    if (!poll) {
        return (
            <div className="flex h-screen items-center justify-center">
                <p className="text-lg">Loading poll details...</p>
            </div>
        );
    }

    return (
        <div className="text-foreground flex h-screen">
            {/* Sidebar */}
            {/* <SideNavbar /> */}

            {/* Main Content */}
            <section className="bg-panel-background flex-1 rounded-2xl p-6">
                <div className="flex flex-col gap-6">
                    {/* Page Header */}
                    <div>
                        <h1 className="text-2xl font-bold">Poll Voting</h1>
                        <p className="text-cards-foreground text-sm">
                            Choose one option below
                        </p>
                    </div>

                    {/* Poll Container */}
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
                            {poll?.options.map((opt, idx) => (
                                <div
                                    key={opt.id}
                                    className="bg-voting-option-background flex items-center justify-between rounded-lg px-4 py-3"
                                >
                                    <span className="font-medium">
                                        {idx + 1}. {opt.text}
                                    </span>
                                    <button
                                        onClick={() => handleVote(opt.id)}
                                        disabled={submitting}
                                        className="rounded bg-purple-600 px-3 py-1 text-sm text-white hover:bg-purple-700 disabled:opacity-50"
                                    >
                                        Vote
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
