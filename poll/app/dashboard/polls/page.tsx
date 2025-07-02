import { CreatePoll } from "./create-poll";

export const metadata = {
  title: "Polls Dashboard",
  description: "Manage your polls here.",
};

export const dynamic = "force-dynamic"; // This ensures the page is always rendered on the server

export default function PollsDashboard() {
  return (
    <section>
      <CreatePoll />
    </section>
  );
}
