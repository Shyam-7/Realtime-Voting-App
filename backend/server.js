const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3001;

// In-memory storage for votes
const votes = {
  option1: 0,
  option2: 0,
};

io.on('connection', (socket) => {
  console.log('New client connected');

  // Send current votes to the newly connected client
  socket.emit('voteUpdate', votes);

  // Handle vote submissions
  socket.on('submitVote', (option) => {
    if (option in votes) {
      votes[option]++;
      io.emit('voteUpdate', votes);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));