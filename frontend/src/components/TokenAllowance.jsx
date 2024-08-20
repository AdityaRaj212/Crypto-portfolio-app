import React, { useState } from 'react';
import { ethers } from 'ethers';
import './TokenAllowance.css'; 

const TokenAllowance = ({ walletAddress }) => {
  const [spenderAddress, setSpenderAddress] = useState('');
  const [tokenAddress, setTokenAddress] = useState('');
  const [allowance, setAllowance] = useState('');
  const [error, setError] = useState(null);

  const checkAllowance = async () => {
    setError(null); // Clear any previous errors

    if (!tokenAddress || !spenderAddress) {
      setError('Please enter both token and spender addresses.');
      return;
    }

    if (!window.ethereum) {
      setError('Ethereum provider not found. Please install MetaMask or another wallet.');
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const erc20Contract = new ethers.Contract(
        tokenAddress,
        ['function allowance(address owner, address spender) view returns (uint256)'],
        provider
      );

      const allowanceAmount = await erc20Contract.allowance(walletAddress, spenderAddress);
      setAllowance(ethers.formatEther(allowanceAmount));
    } catch (err) {
      setError(`Failed to fetch allowance: ${err.message}`);
      setAllowance(''); // Clear previous allowance value
    }
  };

  return (
    <div className="token-allowance-container">
      <input
        className="token-allowance-input"
        type="text"
        placeholder="Token Contract Address"
        value={tokenAddress}
        onChange={(e) => setTokenAddress(e.target.value)}
      />
      <input
        className="token-allowance-input"
        type="text"
        placeholder="Spender Address"
        value={spenderAddress}
        onChange={(e) => setSpenderAddress(e.target.value)}
      />
      <button className="token-allowance-button" onClick={checkAllowance}>Check Allowance</button>

      {error && <p className="token-allowance-error">{error}</p>}
      {allowance && <p className="token-allowance-amount">Allowance: {allowance} tokens</p>}
    </div>
  );
};

export default TokenAllowance;
