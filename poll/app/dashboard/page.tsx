"use client";

import { ClosePollIcon } from "@/public/svgs/close-poll";
import { PendingPollIcon } from "@/public/svgs/pending-poll";
import { TotalPollsIcon } from "@/public/svgs/total-polls";
import Link from "@/app/ui-components/buttons/Link";
import { useEffect, useState } from "react";
import { User } from "@/lib/types/User";
import { Poll } from "@/lib/types/Poll";
import { NavigationButton } from "../ui-components/buttons/NavigationButton";

export default function DashboardHome() {
    const entriesPerPage = 5;

    const [polls, setPolls] = useState<Poll[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | undefined>(undefined);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            const meResponse = await fetch("/api/auth/me");

            if (!meResponse.ok) {
                document.cookie =
                    "auth-token=; Path=/; Max-Age=0; SameSite=Lax";
                document.location.href = "/login";
            }

            const userData = await meResponse.json();
            const user = userData.user as User;
            setUser(user);

            if (typeof document !== "undefined") {
                const t = document.cookie
                    .split("; ")
                    .find((row) => row.startsWith("auth-token="))
                    ?.split("=")[1];
                setToken(t);
            }

            if (user && token) {
                const userPolls = (await (
                    await fetch(`/api/polls`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                ).json()) as Poll[];
                setPolls(userPolls);
                setPage(1);
            }
        };
        fetchData();
    }, [token]);

    // Loading state while user is not present
    if (!user) {
        return (
            <section className="flex h-screen items-center justify-center">
                <p className="text-lg font-semibold">Loading...</p>
            </section>
        );
    }

    return (
        <section className="bg-panel-background m-4 flex flex-col gap-10 rounded-2xl p-6">
            <div className="grid gap-2">
                <p className="text-2xl font-bold">Welcome, {user?.username}!</p>
                <p className="text-cards-foreground">
                    Get a summary of all polls created and create even more
                    polls today!
                </p>
            </div>

            <section className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6">
                <article className="bg-cards-background flex flex-row justify-between rounded-xl p-6">
                    <div className="grid gap-2">
                        <p className="text-cards-foreground text-sm uppercase">
                            Total polls
                        </p>
                        <p className="text-3xl font-bold">{polls.length}</p>
                    </div>
                    <div>
                        <span className="flex h-16 w-16 items-center justify-center rounded-xl bg-[#DFFFDF] p-3">
                            <TotalPollsIcon />
                        </span>
                    </div>
                </article>
                <article className="bg-cards-background flex flex-row justify-between rounded-xl p-6">
                    <div className="grid gap-2">
                        <p className="text-cards-foreground text-sm uppercase">
                            Pending polls
                        </p>
                        <p className="text-3xl font-bold">
                            {
                                polls.filter(
                                    (poll) => poll.status === "pending"
                                ).length
                            }
                        </p>
                    </div>
                    <div>
                        <span className="flex h-16 w-16 items-center justify-center rounded-xl bg-[#FFF7D2] p-3">
                            <PendingPollIcon />
                        </span>
                    </div>
                </article>
                <article className="bg-cards-background flex flex-row justify-between rounded-xl p-6">
                    <div className="grid gap-2">
                        <p className="text-cards-foreground text-sm uppercase">
                            Completed polls
                        </p>
                        <p className="text-3xl font-bold">
                            {
                                polls.filter(
                                    (poll) => poll.status === "completed"
                                ).length
                            }
                        </p>
                    </div>
                    <div>
                        <span className="flex h-16 w-16 items-center justify-center rounded-xl bg-[#FFEBE6] p-3">
                            <ClosePollIcon />
                        </span>
                    </div>
                </article>
            </section>

            <section>
                <h3 className="text-section-header text-sm font-semibold uppercase">
                    Polls
                </h3>
                <div className="bg-table-background mt-6 rounded-xl p-6">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-20 text-cards-foreground border-table-divider border-b text-xs uppercase">
                                <th className="p-4 text-left">S.N</th>
                                <th className="p-4 text-left">Title</th>
                                <th className="p-4 text-left">Description</th>
                                <th className="p-4 text-left">Status</th>
                                <th className="p-4 text-left">Created At</th>
                                <th className="p-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {polls.length === 0 ? (
                                <>
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="pt-8 text-center"
                                        >
                                            No polls created yet
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="pt-4 text-center"
                                        >
                                            <Link href="/dashboard/polls">
                                                Create a poll
                                            </Link>
                                        </td>
                                    </tr>
                                </>
                            ) : null}
                            {polls
                                .filter(
                                    (_, i) =>
                                        i < entriesPerPage * page &&
                                        i >= entriesPerPage * (page - 1)
                                )
                                .map((poll) => (
                                    <tr
                                        key={poll.id}
                                        className="border-table-divider border-b"
                                    >
                                        <td className="p-4">
                                            {polls.length - polls.indexOf(poll)}
                                        </td>
                                        <td className="p-4">{poll.title}</td>
                                        <td className="p-4">
                                            {poll.description.slice(0, 20)}
                                            {poll.description.length > 20
                                                ? "..."
                                                : ""}
                                        </td>
                                        <td className="p-4">
                                            {poll.status || "Pending"}
                                        </td>
                                        <td className="p-4">
                                            {new Date(
                                                poll.createdAt
                                            ).toLocaleDateString()}
                                        </td>
                                        <td className="p-4">
                                            <Link
                                                href={`/dashboard/polls/${poll.id}/results`}
                                            >
                                                Results
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>

                    <div
                        className={`${polls.length === 0 ? "hidden" : ""} mt-6 flex flex-row items-center justify-between`}
                    >
                        <p className="text-cards-foreground mt-4 items-center text-sm">
                            Showing{" "}
                            {polls.length > page * entriesPerPage
                                ? page * entriesPerPage - entriesPerPage
                                : (polls.length > entriesPerPage
                                      ? entriesPerPage * page
                                      : 0) +
                                  (polls.length % entriesPerPage)}{" "}
                            to{" "}
                            {polls.length > page * entriesPerPage
                                ? page * entriesPerPage
                                : polls.length}{" "}
                            of {polls.length} entries
                        </p>

                        <nav className="flex gap-2">
                            <NavigationButton
                                label="Previous"
                                onClick={() =>
                                    setPage((prev) => Math.max(prev - 1, 1))
                                }
                                disabled={page <= 1}
                            />
                            <NavigationButton
                                label="Next"
                                onClick={() =>
                                    setPage((prev) =>
                                        Math.min(
                                            prev + 1,
                                            Math.ceil(
                                                polls.length / entriesPerPage
                                            )
                                        )
                                    )
                                }
                                disabled={
                                    page >=
                                    Math.ceil(polls.length / entriesPerPage)
                                }
                            />
                        </nav>
                    </div>
                </div>
            </section>
        </section>
    );
}
