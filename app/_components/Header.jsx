"use client";

import { Button } from "@/components/ui/button";
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
                        <Button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                            Get Started
                        </Button>
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
