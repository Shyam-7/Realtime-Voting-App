// src/components/VotingInterface.js

import React from 'react';

function VotingInterface({ handleVote }) {
  const votingPools = [
    { id: 'pool1', label: 'Voting Pool 1' },
    { id: 'pool2', label: 'Voting Pool 2' },
    { id: 'pool3', label: 'Voting Pool 3' },
    { id: 'pool4', label: 'Voting Pool 4' },
    { id: 'pool5', label: 'Voting Pool 5' },
  ];

  return (
    <div>
      <h2>Cast Your Vote</h2>
      {votingPools.map((pool) => (
        <button key={pool.id} onClick={() => handleVote(pool.id)}>
          Vote for {pool.label}
        </button>
      ))}
    </div>
  );
}

export default VotingInterface;
