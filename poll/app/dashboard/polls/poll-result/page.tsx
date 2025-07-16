"use client";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PollResultPage() {
    const poll = {
        question: "What part of the application would you like to work on?",
        description: "A poll about user dev preference",
        results: [
            { id: 1, text: "Frontend", voteCount: 99, color: "bg-red-400" },
            { id: 2, text: "Backend", voteCount: 36, color: "bg-cyan-400" },
            {
                id: 3,
                text: "I can do both",
                voteCount: 25,
                color: "bg-gray-300",
            },
        ],
    };

    const totalVotes = poll.results.reduce((sum, r) => sum + r.voteCount, 0);

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
                                                className={`h-2 rounded-full ${option.color}`}
                                                style={{ width: `${percent}%` }}
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
                                                backgroundColor: [
                                                    "#ef4444",
                                                    "#06b6d4",
                                                    "#d1d5db",
                                                ],
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
