"use client";
import { PlusIcon } from "@/public/svgs/plus";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const SideNavbar = () => {
    const pathname = usePathname();
    const navLinks = [
        { name: "Dashboard", href: "/dashboard" },
        { name: "Polls", href: "/dashboard/polls" },
        { name: "History", href: "/dashboard/history" },
        { name: "Settings", href: "/dashboard/settings" },
    ];
    return (
        <nav className="bg-linear-to-b flex h-full w-64 flex-col justify-between bg-gray-800 from-[#E04E51] to-[#552988] p-4 text-white">
            <section className="flex flex-col gap-6">
                <div className="">
                    <h1 className="text-xl font-bold">Poll App</h1>
                </div>

                <button className="flex w-fit items-center gap-2 rounded-xl bg-white px-4 py-2">
                    <span className="h-5 w-5 text-[#D84C54]">
                        <PlusIcon />
                    </span>
                    <p className="font-bold text-[#D84C54]">Create Poll</p>
                </button>
                <ul className="flex w-full flex-col gap-4 font-bold">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <li
                                key={link.name}
                                className={`flex w-full rounded-xl hover:bg-white/20 ${
                                    isActive ? "bg-white/30" : ""
                                }`}
                            >
                                <Link
                                    href={link.href}
                                    className="w-full px-4 py-2"
                                >
                                    {link.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </section>

            <section className="flex flex-col gap-6 rounded-xl bg-white/10 p-4">
                <div className="flex flex-row items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-[#f5f5f5]"></div>
                    <div>
                        <p className="font-bold">User12345</p>
                        <p className="text-sm">user@gmail.com</p>
                    </div>
                </div>
                <button className="mt-4 rounded-xl border border-white px-4 py-2 font-bold text-white">
                    Logout
                </button>
            </section>
        </nav>
    );
};
