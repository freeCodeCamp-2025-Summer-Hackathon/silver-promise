import type { Metadata } from "next";
import "../globals.css";
import { SideNavbar } from "../ui-components/navbars/side-navbar";

export const metadata: Metadata = {
  title: "A simple poll app",
  description: "A simple poll app built with Next.js,Typescript, and Prisma",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <section className="">
        <SideNavbar />
      </section>
      {children}
    </div>
  );
}
