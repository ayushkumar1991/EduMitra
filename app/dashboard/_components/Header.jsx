import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

function Header() {
  return (
    <header className="flex justify-between items-center p-4 shadow-md bg-white">
      {/* Logo & Title */}
      <div className="flex items-center gap-3">
        <Image src="/Favicon.png" alt="Favicon Logo" width={50} height={50} />
        <h1 className="text-xl font-semibold text-gray-700">EduMitra</h1>
      </div>

      {/* User Profile */}
      <div className="flex items-center gap-4">
        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  );
}

export default Header;
