// src/components/VotingChart.js

import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function VotingChart({ votes }) {
  const chartData = {
    labels: ['Voting Pool 1', 'Voting Pool 2', 'Voting Pool 3', 'Voting Pool 4', 'Voting Pool 5'],
    datasets: [
      {
        label: 'Votes',
        data: [
          votes.pool1,
          votes.pool2,
          votes.pool3,
          votes.pool4,
          votes.pool5
        ],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)', 
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(153, 102, 255, 0.6)'
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Voting Results' },
    },
  };

  return (
    <div style={{ width: '700px', height: '400px', margin: 'auto' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
}

export default VotingChart;
