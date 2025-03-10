"use client";

import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import SimplePeer from "simple-peer";

const socket = io("http://localhost:5000"); // Replace with your backend URL

const LiveSession = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [peer, setPeer] = useState<any>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      });

    socket.on("signal", (data) => {
      const newPeer = new SimplePeer({ initiator: false, trickle: false, stream });
      newPeer.signal(data);
      setPeer(newPeer);
    });

    // Return a cleanup function
    return () => {
      socket.disconnect();
    };
  }, []);

  const startSession = () => {
    const newPeer = new SimplePeer({ initiator: true, trickle: false, stream });
    newPeer.on("signal", (data) => socket.emit("signal", data));
    setPeer(newPeer);
  };

  return (
    <div className="flex flex-col items-center">
      <video ref={videoRef} autoPlay playsInline className="w-3/4 border rounded-lg" />
      <button onClick={startSession} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Start Session
      </button>
    </div>
  );
};

export default LiveSession;
