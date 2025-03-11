"use client";

import React, { useEffect } from "react";
import { UserButton } from "@clerk/nextjs";
import { Mic, MicOff } from "lucide-react";
import ProfileSettings from "./_components/ProfileSettings"; 
import AddCourse from "./_components/AddCourse";
import NotificationSystem from "./_components/Notification";
import useVoiceNavigation from "@/app/hooks/useVoiceNavigation";

function Dashboard() {
  const { transcript, listening, startListening, stopListening } = useVoiceNavigation();

  useEffect(() => {
    console.log("Listening:", listening);
    console.log("Transcript:", transcript);
  }, [listening, transcript]);

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>

        {/* Right Section: User Button & Voice Navigation */}
        <div className="flex items-center space-x-4">
          {/* Voice Navigation Button */}
          <button
            onClick={() => {
              console.log("Button clicked!");
              listening ? stopListening() : startListening();
            }}
            className="p-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition"
          >
            {listening ? <MicOff size={24} /> : <Mic size={24} />}
          </button>

          {/* User Profile Button */}
          {/* <UserButton /> */}
        </div>
      </div>

      {/* Debugging Info */}
      {/* <div className="mt-4 p-4 border rounded bg-gray-100">
        <p><strong>Listening:</strong> {listening ? "Yes" : "No"}</p>
        <p><strong>Transcript:</strong> {transcript}</p>
      </div> */}

      {/* Notifications */}
      {/* <NotificationSystem /> */}

      {/* Profile Settings Section */}
      {/* <ProfileSettings /> */}

      {/* Add Course Section */}
      <AddCourse />
    </div>
  );
}

export default Dashboard;
