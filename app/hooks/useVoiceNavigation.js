"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const useVoiceNavigation = () => {
  const router = useRouter();
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  // ✅ Start & Stop Listening
  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true, language: "en-US" });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    // ✅ Convert transcript to lowercase for better matching
    const commandText = transcript.toLowerCase();
    console.log("Recognized Transcript:", commandText);

    // ✅ Handle fuzzy matching
    if (commandText.includes("home")) {
      router.push("/");
    } else if (commandText.includes("dashboard")) {
      router.push("/dashboard");
    } else if (commandText.includes("explore")) {
      router.push("/dashboard/explore");
    } else if (commandText.includes("logout")) {
      alert("Logging out...");
    }

    // ✅ Stop listening after recognizing a command
    if (commandText) {
      stopListening();
      resetTranscript(); // Clear transcript to avoid repeated triggers
    }
  }, [transcript, router]);

  return { transcript, listening, resetTranscript, startListening, stopListening };
};

export default useVoiceNavigation;
