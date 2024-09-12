import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import VotingInterface from './components/VotingInterface';
import VotingChart from './components/VotingChart';
import LoginForm from './components/LoginForm';
import './App.css';

const socket = io('http://localhost:3001');

function App() {
  const [votes, setVotes] = useState({ option1: 0, option2: 0 });
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    socket.on('voteUpdate', (updatedVotes) => {
      setVotes(updatedVotes);
    });

    return () => {
      socket.off('voteUpdate');
    };
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const data = await response.json();
      setUserId(data.userId);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleVote = async (option) => {
    try {
      const response = await fetch('http://localhost:3001/api/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, option }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="App">
      <h1>Real-Time Voting App</h1>
      {userId ? (
        <>
          <p>Logged in as: {userId}</p>
          <VotingInterface handleVote={handleVote} />
          <VotingChart votes={votes} />
        </>
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default App;