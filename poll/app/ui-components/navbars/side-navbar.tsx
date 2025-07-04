"use client";
import { PlusIcon } from "@/public/svgs/plus";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const SideNavbar = () => {
  const pathname = usePathname();
  const navLinks = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Polls", href: "/dashboard/polls" },
    { name: "Settings", href: "/dashboard/settings" },
  ];
  return (
    <nav className="w-64 min-h-screen bg-gray-800 bg-linear-to-b from-[#E04E51] to-[#552988] text-white p-4 flex flex-col justify-between">
      <section className="flex flex-col gap-6">
        <div className="">
          <h1 className="text-xl font-bold">Poll App</h1>
        </div>

        <button className="py-2 w-fit px-4 rounded-xl flex gap-2 items-center bg-white">
          <span className="w-5 h-5">
            <PlusIcon />
          </span>
          <p className="text-black font-bold">Create Poll</p>
        </button>
        <ul className=" flex flex-col w-full font-bold gap-4">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li
                key={link.name}
                className={`w-full flex hover:bg-white/20 rounded-xl ${
                  isActive ? "bg-white/30" : ""
                }`}
              >
                <Link href={link.href} className=" px-4 py-2 w-full">
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="bg-white/10 p-4 rounded-xl flex flex-col gap-6 ">
        <div className="flex flex-row items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[#f5f5f5]"></div>
          <div>
            <p className="font-bold">User12345</p>
            <p className="text-sm">user@gmail.com</p>
          </div>
        </div>
        <button className="mt-4 py-2 px-4 rounded-xl border border-white text-white font-bold">
          Logout
        </button>
      </section>
    </nav>
  );
};
