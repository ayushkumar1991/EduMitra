import { Server } from "socket.io";

export async function GET(req) {
  if (!global.io) {
    const io = new Server(3001, {
      path: "/api/socket",
    });

    io.on("connection", (socket) => {
      console.log("🔗 New client connected:", socket.id);

      socket.on("message", (data) => {
        console.log("📩 New message received:", data);
        io.emit("message", data);
      });

      socket.on("disconnect", () => {
        console.log("❌ Client disconnected:", socket.id);
      });
    });

    global.io = io;
  }

  return new Response("WebSocket server is running!", { status: 200 });
}
