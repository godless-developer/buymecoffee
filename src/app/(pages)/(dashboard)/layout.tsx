"use client";

import { Button } from "@/components/ui/button";
import { ExternalLink, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-full">
      <div className="md:hidden absolute top-2 left-60 z-50 ">
        <Button
          variant="outline"
          onClick={toggleSidebar}
          className="cursor-pointer"
        >
          <Menu />
        </Button>
      </div>

      <aside
        className={`${
          sidebarOpen ? "flex" : "hidden"
        } md:flex flex-col w-64 p-4 bg-white border-r absolute md:relative z-40 h-full`}
      >
        <div className="w-[220px] flex flex-col gap-1">
          <Link href="/" onClick={() => setSidebarOpen(false)}>
            <Button
              className={`w-full ${pathname === "/" ? "bg-[#F4F4F5]" : ""}`}
              variant="ghost"
            >
              Home
            </Button>
          </Link>

          <Link href="/explore" onClick={() => setSidebarOpen(false)}>
            <Button
              className={`w-full ${
                pathname === "/explore" ? "bg-[#F4F4F5]" : ""
              }`}
              variant="ghost"
            >
              Explore
            </Button>
          </Link>

          <Link href="/view" onClick={() => setSidebarOpen(false)}>
            <Button
              className={`w-full ${
                pathname.includes("view") ? "bg-[#F4F4F5]" : ""
              }`}
              variant="ghost"
            >
              View Page <ExternalLink className="ml-1" size={16} />
            </Button>
          </Link>

          <Link href="/settings" onClick={() => setSidebarOpen(false)}>
            <Button
              className={`w-full ${
                pathname === "/settings" ? "bg-[#F4F4F5]" : ""
              }`}
              variant="ghost"
            >
              Account Settings
            </Button>
          </Link>
        </div>
      </aside>

      <div className="flex-1 w-full pt-[44px] overflow-auto">{children}</div>
    </div>
  );
}
