"use client";
import React, { useState, useEffect } from "react";
import { db, auth } from "@/app/_config/firebaseConfig";
import { collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get the current user
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Fetch messages from Firestore in real-time
    const messagesRef = collection(db, "chatMessages");
    const q = query(messagesRef, orderBy("createdAt"));

    const unsubscribeMessages = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(msgs);
    });

    return () => {
      unsubscribe();
      unsubscribeMessages();
    };
  }, []);

  const sendMessage = async () => {
    if (!message.trim() || !user) return;

    await addDoc(collection(db, "chatMessages"), {
      text: message,
      user: user.email,
      createdAt: new Date(),
    });

    setMessage("");
  };

  return (
    <div className="p-4 bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Live Chat</h2>
      <div className="h-64 overflow-y-auto border p-4 rounded-lg mb-4">
        {messages.map((msg) => (
          <div key={msg.id} className="p-2 border-b">
            <strong>{msg.user}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        className="p-2 border rounded w-full text-black"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={sendMessage}
      >
        Send
      </button>
    </div>
  );
};

export default Chat;
