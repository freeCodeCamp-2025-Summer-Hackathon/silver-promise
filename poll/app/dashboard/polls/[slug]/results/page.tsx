"use client";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { PollResult } from "@/lib/types/Poll";
import React from "react";
import { useParams } from "next/navigation";
import chartColors from "@/lib/chartColors";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function PollResultPage() {
    const [poll, setPoll] = React.useState<PollResult | null>(null);
    const [totalVotes, setTotalVotes] = React.useState(0);

    const pollId = useParams<{ slug: string }>().slug;

    // Load poll results based on pollId
    React.useEffect(() => {
        async function fetchPollResults() {
            try {
                const response = await fetch(`/api/polls/${pollId}/results`);
                if (!response.ok) {
                    throw new Error("Failed to fetch poll results");
                }
                const data = await response.json();
                setPoll(data.poll);
                calculateTotalVotes(data.poll.results);
            } catch (error) {
                console.error("Error fetching poll results:", error);
            }
        }

        // Initial load
        fetchPollResults();

        // Setup SSE for real-time updates
        const eventSource = new EventSource(`/api/polls/${pollId}/sse`);

        eventSource.onopen = () => {
            console.log("SSE Connection opened");
        };

        eventSource.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);

                switch (message.type) {
                    case "connected":
                        console.log("SSE Connected to poll:", message.pollId);
                        break;

                    case "poll_update":
                        const poll: PollResult = {
                            id: message.data.id,
                            question: message.data.question,
                            description: message.data.description,
                            title: message.data.title,
                            results: message.data.options.map(
                                (
                                    option: { text: string; votes: number },
                                    index: number
                                ) => ({
                                    id: index + 1,
                                    text: option.text,
                                    voteCount: option.votes,
                                    color: chartColors[
                                        index % chartColors.length
                                    ],
                                })
                            ),
                            options: message.data.options.map(
                                (
                                    option: { text: string; votes: number },
                                    index: number
                                ) => ({
                                    id: index + 1,
                                    text: option.text,
                                    voteCount: option.votes,
                                    color: chartColors[
                                        index % chartColors.length
                                    ],
                                })
                            ),
                            type: message.data.type,
                        };
                        setPoll(poll);
                        calculateTotalVotes(poll.results);
                        break;

                    default:
                        console.log("Unknown message type:", message.type);
                }
            } catch (error) {
                console.error("Error parsing SSE message:", error);
            }
        };

        eventSource.onerror = (error) => {
            console.error("SSE Error:", error);
            eventSource.close();
        };

        // Cleanup
        return () => {
            console.log("Closing SSE connection");
            eventSource.close();
        };
    }, [pollId]);

    /**
     * Calculate the total number of votes from the poll results.
     * @param results - Array of poll results to calculate total votes
     */
    function calculateTotalVotes(results: PollResult["results"]) {
        const total = results.reduce(
            (sum, option) => sum + option.voteCount,
            0
        );
        setTotalVotes(total);
    }

    if (!poll) {
        return (
            <section className="bg-panel-background min-h-screen w-full p-10">
                <div className="text-foreground text-center text-xl font-semibold">
                    Loading poll results...
                </div>
            </section>
        );
    }

    return (
        <section className="bg-panel-background min-h-screen w-full p-10">
            <div className="flex flex-col gap-6">
                <div>
                    <h1 className="text-foreground text-2xl font-bold">
                        Poll Result
                    </h1>
                    <p className="text-cards-foreground text-sm">
                        Start creating polls
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* LEFT: Poll Summary + Results */}
                    <div className="bg-table-background space-y-6 rounded-2xl p-6 shadow lg:col-span-2">
                        <div className="space-y-1">
                            <h2 className="text-foreground text-xl font-semibold">
                                {poll.question}
                            </h2>
                            <p className="text-cards-foreground text-sm">
                                {poll.description}
                            </p>
                        </div>

                        <div className="mt-4 space-y-4">
                            {poll.results.map((option) => {
                                const percent = totalVotes
                                    ? Math.round(
                                          (option.voteCount / totalVotes) * 100
                                      )
                                    : 0;

                                return (
                                    <div key={option.id} className="space-y-1">
                                        <div className="text-foreground flex justify-between font-medium">
                                            <span>{option.text}</span>
                                            <span>{percent}%</span>
                                        </div>
                                        <div className="bg-bar-background h-2 w-full rounded-full">
                                            <div
                                                className="h-2 rounded-full"
                                                style={{
                                                    width: `${percent}%`,
                                                    backgroundColor:
                                                        chartColors[
                                                            option.id - 1
                                                        ],
                                                }}
                                            ></div>
                                        </div>
                                        <p className="text-sm text-gray-500">
                                            {option.voteCount} votes
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* RIGHT: Chart + Meta */}
                    <div className="flex flex-col gap-6">
                        <div className="bg-table-background space-y-4 rounded-2xl p-6 shadow">
                            <h3 className="text-foreground text-lg font-semibold">
                                Votes
                            </h3>
                            <div className="text-center">
                                <p className="text-foreground text-4xl font-bold">
                                    {totalVotes}
                                </p>
                            </div>
                            <div className="mx-auto mt-2 w-40">
                                <Pie
                                    data={{
                                        labels: poll.results.map((r) => r.text),
                                        datasets: [
                                            {
                                                data: poll.results.map(
                                                    (r) => r.voteCount
                                                ),
                                                backgroundColor:
                                                    chartColors.slice(
                                                        0,
                                                        poll.results.length
                                                    ),
                                                borderWidth: 0,
                                            },
                                        ],
                                    }}
                                    options={{
                                        plugins: {
                                            legend: { display: false },
                                        },
                                        rotation: -90,
                                        circumference: 360,
                                    }}
                                />
                            </div>
                            <p className="text-cards-foreground text-center text-sm">
                                Poll expiry date <br />
                                <span className="text-foreground font-semibold">
                                    12 June, 2025
                                </span>
                            </p>
                        </div>

                        <div className="bg-table-background space-y-2 rounded-2xl p-6 shadow">
                            <h3 className="text-foreground text-lg font-semibold">
                                Share
                            </h3>
                            <button className="w-full text-left text-sm text-blue-500 hover:underline">
                                Twitter
                            </button>
                            <button className="w-full text-left text-sm text-blue-700 hover:underline">
                                Facebook
                            </button>
                            <button className="text-cards-foreground w-full text-left text-sm hover:underline">
                                Copy link
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
