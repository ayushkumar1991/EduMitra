"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { ThemeProvider } from "next-themes";
import SideBar from "./_components/SideBar";
import Header from "./_components/Header";
import "regenerator-runtime/runtime";


// Dynamically import Speech Recognition (client-side only)
const SpeechRecognition = dynamic(
  () => import("react-speech-recognition").then((mod) => mod.default),
  { ssr: false }
);
const useSpeechRecognition = dynamic(
  () => import("react-speech-recognition").then((mod) => mod.useSpeechRecognition),
  { ssr: false }
);

export default function DashboardLayout({ children }) {
  {
  const [mounted, setMounted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevents SSR hydration mismatch
  if (!mounted) return null;

  // Voice commands for navigation
  const commands = [
    { command: "go to home", callback: () => router.push("/") },
    { command: "open dashboard", callback: () => router.push("/dashboard") },
    { command: "profile", callback: () => router.push("/profile") },
    { command: "my courses", callback: () => router.push("/courses") },
    { command: "explore courses", callback: () => router.push("/explore") },
    { command: "logout", callback: () => alert("Logging out...") },
  ];

  const { transcript, listening, browserSupportsSpeechRecognition } = useSpeechRecognition({ commands });

  // Function to start listening
  const handleVoiceButtonClick = () => {
    if (!browserSupportsSpeechRecognition) {
      alert("Your browser does not support speech recognition");
      return;
    }
    SpeechRecognition.startListening({ continuous: true });
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex min-h-screen bg-background text-foreground transition-all duration-300">
        {/* Sidebar */}
        <aside
          className={`${
            isSidebarOpen ? "w-64" : "w-20"
          } hidden md:block bg-card shadow-md dark:bg-gray-800 transition-all duration-300`}
        >
          <SideBar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col">
          {/* Header with Sidebar Toggle */}
          <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

          {/* Voice Control Button */}
          <div className="p-6 flex items-center justify-between">
            
            <p className="text-gray-800 dark:text-gray-300">
              {listening ? "Listening..." : "Click the mic to speak"}
            </p>
          </div>

          {/* Page Content */}
          <div className="p-6">{children}</div>
        </main>
      </div>
    </ThemeProvider>
  );
}}
