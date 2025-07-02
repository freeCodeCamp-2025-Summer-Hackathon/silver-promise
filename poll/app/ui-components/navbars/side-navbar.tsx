import Link from "next/link";

export const SideNavbar = () => {
  return (
    <nav className="w-64 min-h-screen bg-gray-800 text-white">
      <div className="p-4">
        <h1 className="text-xl font-bold">Poll App</h1>
      </div>
      <ul className="mt-4 flex flex-col w-full">
        <li className="w-full flex hover:bg-gray-700">
          <Link href="/dashboard" className=" px-4 py-2 w-full">
            Dashboard
          </Link>
        </li>
        <li className="w-full flex hover:bg-gray-700">
          <Link href="dashboard/polls" className="px-4 py-2 w-full">
            Polls
          </Link>
        </li>
        <li className="w-full flex hover:bg-gray-700">
          <Link href="/dashboard" className="px-4 py-2 w-full">
            Settings
          </Link>
        </li>
      </ul>
    </nav>
  );
};
