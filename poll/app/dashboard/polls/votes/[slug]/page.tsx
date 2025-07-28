"use client";
import { useParams } from "next/navigation";
import { PollDetailPageWithPollId } from "./pollVotingPage";

export default function PollDetailPage() {
    const params = useParams<{ slug: string }>();
    const pollId = params.slug;

    return <PollDetailPageWithPollId pollId={Number(pollId)} />;
}
