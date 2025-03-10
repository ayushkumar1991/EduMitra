"use client";

import React, { useEffect, useState } from "react";
import SideBar from "./_components/SideBar";
import Header from "./_components/Header";
import { ThemeProvider } from "next-themes";

function DashboardLayout({ children }) {
  // Prevent hydration mismatches
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent rendering mismatched content before mounting
  if (!mounted) return null;

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <div className="flex">
        {/* Sidebar */}
        <div className="md:w-64 hidden md:block">
          <SideBar />
        </div>

        {/* Main Content */}
        <div className="flex-1 md:ml-64">
          <Header />
          <div className="p-10">{children}</div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default DashboardLayout;
