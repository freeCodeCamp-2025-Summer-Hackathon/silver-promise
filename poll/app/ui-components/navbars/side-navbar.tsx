"use client";
import { PlusIcon } from "@/public/svgs/plus";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/lib/contexts/AuthContext";

export const SideNavbar = () => {
    const pathname = usePathname();
    const navLinks = [
        { name: "Dashboard", href: "/dashboard" },
        { name: "Polls", href: "/dashboard/polls" },
        // { name: "History", href: "/dashboard/history" },
        { name: "Settings", href: "/dashboard/settings" },
    ];
    const { user, logout } = useAuth();

    function handleLogout() {
        document.cookie = "auth-token=; expires=0; path=/;";
        logout();
        window.location.href = "/login";
    }

    return (
        <nav className="bg-linear-to-b from-soft-red to-dark-violet flex h-full w-64 flex-col justify-between bg-gray-800 p-4 text-white">
            <section className="flex flex-col gap-6">
                <div className="">
                    <h1 className="text-xl font-bold">Poll Palls</h1>
                </div>
                <ul className="flex w-full flex-col gap-4 font-bold">
                    <li className="flex w-fit items-center gap-2 rounded-xl bg-white transition-colors hover:bg-white/70">
                        <Link
                            href="/dashboard/polls"
                            className="text-soft-red flex items-center gap-2 px-4 py-2"
                        >
                            <span className="text-soft-red h-5 w-5">
                                <PlusIcon />
                            </span>
                            <p className="text-soft-red font-bold">
                                Create Poll
                            </p>
                        </Link>
                    </li>
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
                    {/* Profile Picture */}
                    <div className="h-10 w-10 rounded-full bg-[#f5f5f5]">
                        <Image
                            src="/user.svg"
                            alt="Profile Picture"
                            width={40}
                            height={40}
                            className="h-full w-full rounded-full object-cover p-2"
                        />
                    </div>
                    <div>
                        <p className="font-bold">{user?.username || "User"}</p>
                        <p className="text-sm">{user?.email || ""}</p>
                    </div>
                </div>
                <button
                    className="mt-4 rounded-xl border border-white px-4 py-2 font-bold text-white transition-colors hover:bg-white/20"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </section>
        </nav>
    );
};
