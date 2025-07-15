import { ClosePollIcon } from "@/public/svgs/close-poll";
import { PendingPollIcon } from "@/public/svgs/pending-poll";
import { TotalPollsIcon } from "@/public/svgs/total-polls";
import Link from "@/app/ui-components/buttons/Link";

export default function DashboardHome() {
    return (
        <section className="bg-panel-background m-4 flex max-h-screen flex-col gap-10 rounded-2xl p-6">
            <div className="grid gap-2">
                <p className="text-2xl font-bold">Welcome, User1234!</p>
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
                        <p className="text-3xl font-bold">20</p>
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
                        <p className="text-3xl font-bold">20</p>
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
                        <p className="text-3xl font-bold">20</p>
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
                            <tr className="border-table-divider border-b">
                                <td className="p-4">1</td>
                                <td className="p-4">Poll 1</td>
                                <td className="p-4">Poll about dev pref..</td>
                                <td className="p-4">Pending</td>
                                <td className="p-4">2023-10-01</td>
                                <td className="p-4">
                                    <Link href="/dashboard/polls/1">View</Link>
                                </td>
                            </tr>
                            <tr className="border-table-divider border-b">
                                <td className="p-4">2</td>
                                <td className="p-4">Poll 1</td>
                                <td className="p-4">Poll about dev pref..</td>
                                <td className="p-4">Pending</td>
                                <td className="p-4">2023-10-01</td>
                                <td className="p-4">
                                    <Link href="/dashboard/polls/1">View</Link>
                                </td>
                            </tr>
                            <tr className="border-table-divider border-b">
                                <td className="p-4">3</td>
                                <td className="p-4">Poll 1</td>
                                <td className="p-4">Poll about dev pref..</td>
                                <td className="p-4">Pending</td>
                                <td className="p-4">2023-10-01</td>
                                <td className="p-4">
                                    <Link href="/dashboard/polls/1">
                                        View result
                                    </Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="mt-6 flex flex-row items-center justify-between">
                        <p className="text-cards-foreground mt-4 items-center text-sm">
                            Showing 1 to 3 of 20 entries
                        </p>

                        <nav className="flex gap-2">
                            <button className="bg-navigation-background rounded-lg px-4 py-2 text-sm">
                                Previous
                            </button>
                            <button className="bg-navigation-background rounded-lg px-4 py-2 text-sm">
                                Next
                            </button>
                        </nav>
                    </div>
                </div>
            </section>
        </section>
    );
}
