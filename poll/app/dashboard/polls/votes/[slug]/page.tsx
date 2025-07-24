import { PollRepository } from "@/lib/db/repositories/pollRepository";
import PollDetailPage from "../vote";

export default async function VotingPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const slug = (await params).slug;

    console.log(slug);

    const pollId = await PollRepository.getPollIdBySlug(slug);

    if (!pollId) {
        return (
            <div className="flex h-screen items-center justify-center">
                <p className="text-lg">Poll not found</p>
            </div>
        );
    }

    return (
        <div className="bg-cards-background flex h-screen">
            <div className="w-ful bg-panel-background m-4 flex h-[calc(100vh-2rem)] w-full rounded-2xl p-6">
                <PollDetailPage pollId={slug} />
            </div>
        </div>
    );
}
