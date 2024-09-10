import React from 'react';

function VotingInterface({ handleVote }) {
  return (
    <div>
      <h2>Cast Your Vote</h2>
      <button onClick={() => handleVote('option1')}>Vote for Option 1</button>
      <button onClick={() => handleVote('option2')}>Vote for Option 2</button>
    </div>
  );
}

export default VotingInterface;