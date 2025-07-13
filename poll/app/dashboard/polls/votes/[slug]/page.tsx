import { mockApi } from "@/lib/mockApi";

export default async function Page({ params }: { params: { slug: string } }) {
    const { slug } = await params;

    const pollTitle = decodeURIComponent(slug);
    const poll = await mockApi.getPollsById(pollTitle);

    console.log(poll);

    return (
        <section className="m-4 flex min-h-screen flex-col rounded-2xl bg-[#f7f7f7] p-6">
            hello {params.slug}
        </section>
    );
}
