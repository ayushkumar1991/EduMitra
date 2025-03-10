"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

function Header() {
    return (
        <div className="flex justify-between items-center p-4 shadow-md bg-white">
            {/* Logo */}
            <Image
                src="/EduMitra.png"
                alt="EduMitra Logo"
                width={90}
                height={100}
            />

            {/* Authentication - Show Sign In button when signed out, User Profile when signed in */}
            <div>
                <SignedOut>
                    <SignInButton mode="modal">
                    
                    </SignInButton>
                </SignedOut>

                <SignedIn>
                    <UserButton afterSignOutUrl="/" />
                </SignedIn>
            </div>
        </div>
    );
}

export default Header;
