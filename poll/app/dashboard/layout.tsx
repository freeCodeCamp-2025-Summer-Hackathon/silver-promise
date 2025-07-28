import type { Metadata } from "next";
import "../globals.css";
import { SideNavbar } from "../ui-components/navbars/side-navbar";

export const metadata: Metadata = {
    title: "Poll Palls - Dashboard",
    description:
        "Manage your polls and settings. Create and vote on polls easily.",
    keywords: ["polls", "dashboard", "settings", "create poll", "vote"],
};

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="relative flex">
            <section className="fixed top-0 z-10 h-full">
                <SideNavbar />
            </section>
            <section className="ml-64 w-full">{children}</section>
        </div>
    );
}
