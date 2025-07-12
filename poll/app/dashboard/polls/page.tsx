import { CreatePoll } from "./create-poll";

export const metadata = {
    title: "Polls Dashboard",
    description: "Manage your polls here.",
};

export const dynamic = "force-dynamic"; // This ensures the page is always rendered on the server

/**
 * @description This function is the entry point of the create-poll
 * @returns JSX.Element
 */
export default function PollsDashboard() {
    return (
        <section className="w-full">
            <CreatePoll />
        </section>
    );
}
