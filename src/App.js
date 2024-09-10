import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import VotingInterface from './components/VotingInterface';
import VotingChart from './components/VotingChart';
import './App.css';

const socket = io('http://localhost:3001');

function App() {
  const [votes, setVotes] = useState({ option1: 0, option2: 0 });

  useEffect(() => {
    socket.on('voteUpdate', (updatedVotes) => {
      setVotes(updatedVotes);
    });

    return () => {
      socket.off('voteUpdate');
    };
  }, []);

  const handleVote = (option) => {
    socket.emit('submitVote', option);
  };

  return (
    <div className="App">
      <h1>Real-Time Voting App</h1>
      <VotingInterface handleVote={handleVote} />
      <VotingChart votes={votes} />
    </div>
  );
}

export default App;
