// src/App.js

import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import VotingInterface from './components/VotingInterface';
import VotingChart from './components/VotingChart';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import './App.css';

const socket = io('http://localhost:3001');

function App() {
  const [votes, setVotes] = useState({ pool1: 0, pool2: 0, pool3: 0, pool4: 0, pool5: 0 });
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

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setUserId(data.userId);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRegister = async (username, password) => {
    try {
      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      // Optionally, auto-login after registration
      setUserId(username);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleVote = async (pool) => {
    try {
      const response = await fetch('http://localhost:3001/api/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, pool }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    setUserId(null);
  };

  return (
    <Router>
      <div className="App">
        <h1>Real-Time Voting App</h1>
        <nav>
          {userId ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <Link to="/login">
                <button>Login</button>
              </Link>
              <Link to="/register">
                <button>Register</button>
              </Link>
            </>
          )}
        </nav>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Routes>
          <Route
            path="/login"
            element={
              userId ? (
                <Navigate to="/voting" />
              ) : (
                <LoginForm onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/register"
            element={
              userId ? (
                <Navigate to="/voting" />
              ) : (
                <RegisterForm onRegister={handleRegister} />
              )
            }
          />
          <Route
            path="/voting"
            element={
              userId ? (
                <>
                  <p>Logged in as: {userId}</p>
                  <VotingInterface handleVote={handleVote} />
                  <VotingChart votes={votes} />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/"
            element={<Navigate to={userId ? "/voting" : "/login"} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
