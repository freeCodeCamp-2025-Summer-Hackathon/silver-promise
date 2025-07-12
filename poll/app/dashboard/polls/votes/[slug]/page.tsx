import { mockApi } from "@/lib/mockapi";
export default async function Page({ params }: { params: { slug: string } }) {
    const pollTitle = decodeURIComponent(params.slug);
    const poll = await mockApi.getPollsById(pollTitle);

    console.log(poll);

    return (
        <section className="m-4 flex min-h-screen flex-col rounded-2xl bg-[#f7f7f7] p-6">
            hello
        </section>
    );
}
