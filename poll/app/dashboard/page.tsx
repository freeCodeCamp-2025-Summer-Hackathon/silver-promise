import { ClosePollIcon } from "@/public/svgs/close-poll";
import { PendingPollIcon } from "@/public/svgs/pending-poll";
import { TotalPollsIcon } from "@/public/svgs/total-polls";
import Link from "next/link";

export default function DashboardHome() {
  return (
    <section className="flex flex-col max-h-screen m-4 p-6 w-full  gap-10 bg-[#f7f7f7] rounded-2xl">
      <div className="grid gap-2">
        <p className="font-bold text-2xl">Welcome, User1234!</p>
        <p className=" text-[#7b7b7b] ">
          Get a summary of all polls created and create even more polls today!
        </p>
      </div>

      <section className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6">
        <article className="flex flex-row  p-6 bg-white justify-between rounded-xl">
          <div className="grid gap-2">
            <p className="uppercase text-sm text-[#7b7b7b]">Total polls</p>
            <p className="text-3xl font-bold">20</p>
          </div>
          <div>
            <span className="w-16 h-16 p-3 bg-[#DFFFDF]  rounded-xl flex items-center justify-center">
              <TotalPollsIcon />
            </span>
          </div>
        </article>
        <article className="flex flex-row  p-6 bg-white justify-between rounded-xl">
          <div className="grid gap-2">
            <p className="uppercase text-sm text-[#7b7b7b]">Pending polls</p>
            <p className="text-3xl font-bold">20</p>
          </div>
          <div>
            <span className="w-16 h-16 p-3 bg-[#FFF7D2]  rounded-xl flex items-center justify-center">
              <PendingPollIcon />
            </span>
          </div>
        </article>
        <article className="flex flex-row  p-6 bg-white justify-between rounded-xl">
          <div className="grid gap-2">
            <p className="uppercase text-sm text-[#7b7b7b]">Completed polls</p>
            <p className="text-3xl font-bold">20</p>
          </div>
          <div>
            <span className="w-16 h-16 p-3 bg-[#FFEBE6]  rounded-xl flex items-center justify-center">
              <ClosePollIcon />
            </span>
          </div>
        </article>
      </section>

      <section className="">
        <h3 className="text-[#7b7b7b] font-semibold text-sm">POLLS</h3>
        <div className="p-6 mt-6 bg-white rounded-xl">
          <table className="w-full ">
            <thead>
              <tr className="bg-gray-20 text-[#7b7b7b] text-xs border-b border-[#e0e0e0] uppercase">
                <th className="p-4 text-left">S.N</th>
                <th className="p-4 text-left">Title</th>
                <th className="p-4 text-left">Description</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Created At</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-[#e0e0e0]">
                <td className="p-4">1</td>
                <td className="p-4">Poll 1</td>
                <td className="p-4">Poll about dev pref..</td>
                <td className="p-4">Pending</td>
                <td className="p-4">2023-10-01</td>
                <td className="p-4">
                  <Link href="/dashboard/polls/1" className="text-blue-500">
                    View
                  </Link>
                </td>
              </tr>
              <tr className="border-b border-[#e0e0e0]">
                <td className="p-4">2</td>
                <td className="p-4">Poll 1</td>
                <td className="p-4">Poll about dev pref..</td>
                <td className="p-4">Pending</td>
                <td className="p-4">2023-10-01</td>
                <td className="p-4">
                  <Link href="/dashboard/polls/1" className="text-blue-500">
                    View
                  </Link>
                </td>
              </tr>
              <tr className="border-b border-[#e0e0e0]">
                <td className="p-4">3</td>
                <td className="p-4">Poll 1</td>
                <td className="p-4">Poll about dev pref..</td>
                <td className="p-4">Pending</td>
                <td className="p-4">2023-10-01</td>
                <td className="p-4">
                  <Link href="/dashboard/polls/1" className="text-blue-500">
                    View result
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="flex flex-row items-center mt-6 justify-between">
            <p className="text-sm items-center text-[#7b7b7b] mt-4">Showing 1 to 3 of 20 entries</p>

            <nav className="flex gap-2">
              <button className="px-4 py-2 bg-gray-200 rounded-lg text-sm">Previous</button>
              <button className="px-4 py-2 bg-gray-200 rounded-lg text-sm">Next</button>
            </nav>
          </div>
        </div>
      </section>
    </section>
  );
}
