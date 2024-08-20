import React, { useState } from 'react';
import { ethers, formatEther } from 'ethers';
import './TokenWatchList.css';

const TokenWatchList = ({ walletAddress }) => {
  const [tokenAddress, setTokenAddress] = useState('');
  const [tokens, setTokens] = useState([]);

  const addToken = async () => {
    if (!tokenAddress) return;

    const provider = new ethers.BrowserProvider(window.ethereum);
    const balance = await provider.getBalance(walletAddress);
    const token = { address: tokenAddress, balance: formatEther(balance) };

    setTokens([...tokens, token]);
    setTokenAddress('');
  };

  return (
    <div className="token-watchlist-container">
      <input
        className="token-watchlist-input"
        type="text"
        placeholder="Token Contract Address"
        value={tokenAddress}
        onChange={(e) => setTokenAddress(e.target.value)}
      />
      <button className="token-watchlist-button" onClick={addToken}>Add Token</button>
      <ul className="token-watchlist-list">
        {tokens.map((token, index) => (
          <li className="token-watchlist-item" key={index}>
            {token.address}: {token.balance} ETH
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TokenWatchList;
