"use client";

import React, { useEffect } from "react";  
import { Mic, MicOff } from "lucide-react";  // ✅ Import Mic & MicOff icons
import CourseRecommendations from "../_components/CourseRecommendations";
import useVoiceNavigation from "@/app/hooks/useVoiceNavigation";

function Explore() {
  const { transcript, listening, startListening, stopListening } = useVoiceNavigation();

  useEffect(() => {
    console.log("Listening:", listening);
    console.log("Transcript:", transcript);
  }, [listening, transcript]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Explore Courses</h1>

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
      
      <CourseRecommendations />
    </div>
  );
}

export default Explore;
