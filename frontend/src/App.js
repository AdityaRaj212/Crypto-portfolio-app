import React, { useState } from 'react';
import WalletConnection from './components/WalletConnection';
import TokenWatchList from './components/TokenWatchList';
import HistoricalData from './components/HistoricalData';
import TokenAllowance from './components/TokenAllowance';
import TokenTransfer from './components/TokenTransfer';

const App = () => {
  const [walletAddress, setWalletAddress] = useState('');

  return (
    <div>
      <h1>Crypto Portfolio App</h1>
      <WalletConnection setWalletAddress={setWalletAddress} />
      {walletAddress && (
        <>
          <TokenWatchList walletAddress={walletAddress} />
          <HistoricalData walletAddress={walletAddress} />
          <TokenAllowance walletAddress={walletAddress} />
          <TokenTransfer walletAddress={walletAddress} />
        </>
      )}
    </div>
  );
};

export default App;
