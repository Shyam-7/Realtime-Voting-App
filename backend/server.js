// server.js

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

// In-memory storage for users, votes, and user votes
const users = new Map(); // username -> password
const votes = {
  pool1: 0,
  pool2: 0,
  pool3: 0,
  pool4: 0,
  pool5: 0,
};
const userVotes = new Set(); // Set of userIds who have voted

// Registration route
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  
  // Basic validation
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  if (users.has(username)) {
    return res.status(400).json({ error: 'Username already exists' });
  }

  // In production, hash the password before storing
  users.set(username, password);
  res.json({ message: 'User registered successfully' });
});

// Updated Login route
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  if (!users.has(username)) {
    return res.status(404).json({ error: 'User not found' });
  }

  if (users.get(username) !== password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  res.json({ userId: username });
});

// Updated Voting route
app.post('/api/vote', (req, res) => {
  const { userId, pool } = req.body;

  if (!userId || !pool) {
    return res.status(400).json({ error: 'UserId and pool are required' });
  }

  if (!users.has(userId)) {
    return res.status(404).json({ error: 'User not found' });
  }

  if (!votes.hasOwnProperty(pool)) {
    return res.status(400).json({ error: 'Invalid voting pool' });
  }

  if (userVotes.has(userId)) {
    return res.status(400).json({ error: 'You have already voted' });
  }

  // Record the vote
  votes[pool]++;
  userVotes.add(userId);
  
  io.emit('voteUpdate', votes);
  res.json({ message: 'Vote recorded successfully', votes });
});

io.on('connection', (socket) => {
  console.log('New client connected');
  socket.emit('voteUpdate', votes);

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
