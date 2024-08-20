import React, { useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import './HistoricalData.css';

const HistoricalData = ({ walletAddress }) => {
  const [tokenAddress, setTokenAddress] = useState('');
  const [historicalData, setHistoricalData] = useState(null);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const fetchHistoricalData = async () => {
    const { start, end } = dateRange;

    // Example API call, you may need to replace this with a real API
    const response = await axios.get(`api/tokens/list`, {
      params: { walletAddress, tokenAddress, start, end },
    });

    setHistoricalData(response.data);
  };

  const chartData = {
    labels: historicalData ? historicalData.dates : [],
    datasets: [
      {
        label: 'Token Balance Over Time',
        data: historicalData ? historicalData.balances : [],
        fill: false,
        backgroundColor: 'blue',
        borderColor: 'blue',
      },
    ],
  };

  return (
    <div className="historical-data-container">
      <input
        className="historical-data-input"
        type="text"
        placeholder="Token Contract Address"
        value={tokenAddress}
        onChange={(e) => setTokenAddress(e.target.value)}
      />
      <input
        className="historical-data-input"
        type="date"
        placeholder="Start Date"
        value={dateRange.start}
        onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
      />
      <input
        className="historical-data-input"
        type="date"
        placeholder="End Date"
        value={dateRange.end}
        onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
      />
      <button className="historical-data-button" onClick={fetchHistoricalData}>Fetch Historical Data</button>

      {historicalData && <div className="chart-container"><Line data={chartData} /></div>}
    </div>
  );
};

export default HistoricalData;
