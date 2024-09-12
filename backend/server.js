const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3001;

// In-memory storage for votes and users
const votes = {
  option1: 0,
  option2: 0,
};
const users = new Map();
const userVotes = new Set();

// Basic login route
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    if (!users.has(username)) {
      users.set(username, password);
    } else if (users.get(username) !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    res.json({ userId: username });
  } else {
    res.status(400).json({ error: 'Username and password are required' });
  }
});

// Voting route
app.post('/api/vote', (req, res) => {
  const { userId, option } = req.body;
  const userVoteKey = `${userId}:${option}`;

  if (userVotes.has(userVoteKey)) {
    return res.status(400).json({ error: 'You have already voted for this option' });
  }

  if (option in votes) {
    votes[option]++;
    userVotes.add(userVoteKey);
    io.emit('voteUpdate', votes);
    res.json({ message: 'Vote recorded successfully', votes });
  } else {
    res.status(400).json({ error: 'Invalid voting option' });
  }
});

io.on('connection', (socket) => {
  console.log('New client connected');
  socket.emit('voteUpdate', votes);
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));