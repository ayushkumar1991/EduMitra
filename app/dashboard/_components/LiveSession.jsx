"use client";

import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import SimplePeer from "simple-peer";

const SOCKET_SERVER_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001"; 
const socket = io(SOCKET_SERVER_URL); // Uses environment variable or default to localhost:3001

const LiveSession = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [peer, setPeer] = useState<SimplePeer.Instance | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const getMediaStream = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (error) {
        console.error("Error accessing media devices:", error);
      }
    };

    getMediaStream();

    socket.on("signal", (data) => {
      if (stream) {
        const newPeer = new SimplePeer({ initiator: false, trickle: false, stream });
        newPeer.signal(data);
        setPeer(newPeer);
      }
    });

    return () => {
      if (peer) peer.destroy(); // Destroy peer connection on unmount
      socket.disconnect();
    };
  }, [stream]);

  const startSession = () => {
    if (!stream) return;
    const newPeer = new SimplePeer({ initiator: true, trickle: false, stream });

    newPeer.on("signal", (data) => {
      socket.emit("signal", data);
    });

    setPeer(newPeer);
  };

  return (
    <div className="flex flex-col items-center">
      <video ref={videoRef} autoPlay playsInline className="w-3/4 border rounded-lg" />
      <button
        onClick={startSession}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Start Session
      </button>
    </div>
  );
};

export default LiveSession;
