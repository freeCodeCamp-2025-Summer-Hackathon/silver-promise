import Link from "next/link";

export default function DashboardHome() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-16">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-lg">Welcome to the dashboard!</p>
      <div className="flex gap-6">
        <Link href={"/dashboard/polls"} className=" text-blue-500">
          Goto create poll
        </Link>

        <Link href={"/log-in"} className=" text-green-500">
          Goto login page
        </Link>
      </div>
    </div>
  );
}
