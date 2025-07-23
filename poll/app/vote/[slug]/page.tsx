import PollDetailPage from "@/app/dashboard/polls/votes/[slug]/page";
import { PollRepository } from "@/lib/db/repositories/pollRepository";

export default async function VotingPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const slug = (await params).slug;

    const pollId = await PollRepository.getPollIdBySlug(slug);

    if (!pollId) {
        return (
            <div className="flex h-screen items-center justify-center">
                <p className="text-lg">Poll not found</p>
            </div>
        );
    }

    return (
        <div className="bg-cards-background flex h-screen w-full items-center justify-center">
            <div className="bg-panel-background m-4 flex h-[calc(100vh-2rem)] w-full items-center justify-center overflow-hidden rounded-2xl">
                <div className="w-full max-w-3xl p-6">
                    <PollDetailPage pollId={pollId} />
                </div>
            </div>
        </div>
    );
}
