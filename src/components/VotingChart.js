import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function VotingChart({ votes }) {
  const chartData = {
    labels: ['Option 1', 'Option 2'],
    datasets: [
      {
        label: 'Votes',
        data: [votes.option1, votes.option2],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
      },
    ],
  };

  return (
    <div style={{ width: '500px', height: '300px' }}>
      <h2>Voting Results</h2>
      <Bar data={chartData} />
    </div>
  );
}

export default VotingChart;