const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins (change for security in production)
    methods: ["GET", "POST"],
  },
});

app.use(cors());

// Handle socket connection
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Handle messages from clients
  socket.on("message", (data) => {
    console.log("Message received:", data);
    io.emit("message", data); // Broadcast to all users
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Start the server
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
