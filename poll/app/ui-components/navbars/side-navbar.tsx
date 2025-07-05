import Link from "next/link";

export const SideNavbar = () => {
    return (
        <nav className="min-h-screen w-64 bg-gray-800 text-white">
            <div className="p-4">
                <h1 className="text-xl font-bold">Poll App</h1>
            </div>
            <ul className="mt-4 flex w-full flex-col">
                <li className="flex w-full hover:bg-gray-700">
                    <Link href="/dashboard" className="w-full px-4 py-2">
                        Dashboard
                    </Link>
                </li>
                <li className="flex w-full hover:bg-gray-700">
                    <Link href="dashboard/polls" className="w-full px-4 py-2">
                        Polls
                    </Link>
                </li>
                <li className="flex w-full hover:bg-gray-700">
                    <Link href="/dashboard" className="w-full px-4 py-2">
                        Settings
                    </Link>
                </li>
            </ul>
        </nav>
    );
};
