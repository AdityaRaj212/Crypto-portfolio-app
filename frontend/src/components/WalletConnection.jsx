import React, { useState } from 'react';
import './WalletConnection.css';

const WalletConnection = ({ setWalletAddress }) => {
  const [errorMessage, setErrorMessage] = useState('');

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(accounts[0]);
      } catch (error) {
        setErrorMessage('Failed to connect wallet');
      }
    } else {
      setErrorMessage('Install MetaMask');
    }
  };

  return (
    <div className="wallet-connection-container">
      <button className="wallet-connection-button" onClick={connectWallet}>Connect Wallet</button>
      {errorMessage && <p className="wallet-connection-error">{errorMessage}</p>}
    </div>
  );
};

export default WalletConnection;
