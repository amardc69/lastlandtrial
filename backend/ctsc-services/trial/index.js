// client.js
const { io } = require('socket.io-client');

// Connect to the server running on port 4002
const socket = io('http://localhost:4002');

// --- Event Listeners ---

// Fired upon a successful connection
socket.on('connect', () => {
  console.log(`✅ Successfully connected to server with ID: ${socket.id}`);

  // Send an initial message right after connecting
  socket.emit('clientMessage', 'Hello from the Node.js client!');
});

// Listens for the 'serverMessage' event from the server
socket.on('serverMessage', (data) => {
  console.log(`💻 Server says: ${data}`);
});

// Listens for when another user joins
socket.on('userJoined', (data) => {
  console.log(`👋 ${data}`);
});

// Listens for when another user leaves
socket.on('userLeft', (data) => {
  console.log(`🚪 ${data}`);
});

// Fired upon a disconnection
socket.on('disconnect', () => {
  console.log('❌ Disconnected from server.');
});

// --- Pushing Messages ---

// Example: Send a message every 5 seconds to the server
setInterval(() => {
  const message = `Client heartbeat at ${new Date().toLocaleTimeString()}`;
  socket.emit('clientMessage', message);
}, 5000);