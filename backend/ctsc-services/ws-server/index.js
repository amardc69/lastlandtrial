// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

// Initialize Socket.IO with CORS enabled for client connection
const io = new Server(server, {
  cors: {
    origin: "*", // Allow your Next.js client to connect
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 4002;

app.get('/', (req, res) => {
  res.send('Socket.IO server is running');
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Listen for a custom event from the client
  socket.on('clientMessage', (message) => {
    console.log('Message from client:', message);
    // Echo the message back to the client
    socket.emit('serverMessage', `Server received: "${message}"`);
  });

  // Broadcast a message to all connected clients (except the sender)
  socket.broadcast.emit('userJoined', `${socket.id} has joined the chat.`);

  // Listen for disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    io.emit('userLeft', `${socket.id} has left the chat.`); // Emit to all clients
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on *:${PORT}`);
});
