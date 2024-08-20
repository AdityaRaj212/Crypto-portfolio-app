import React, { useState } from 'react';
import { parseEther } from 'ethers';
import { ethers } from 'ethers';
import './TokenTransfer.css';

const TokenTransfer = ({ walletAddress }) => {
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [tokenAddress, setTokenAddress] = useState('');
  const [status, setStatus] = useState('');

  const transferTokens = async () => {
    if (!tokenAddress || !recipientAddress || !amount) return;

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = provider.getSigner();
    const erc20Contract = new ethers.Contract(
      tokenAddress,
      ['function transfer(address to, uint amount) returns (bool)'],
      signer
    );

    try {
      const tx = await erc20Contract.transfer(recipientAddress, parseEther(amount));
      await tx.wait();
      setStatus('Transfer successful!');
    } catch (error) {
      setStatus('Transfer failed');
    }
  };

  return (
    <div className="token-transfer-container">
      <input
        className="token-transfer-input"
        type="text"
        placeholder="Token Contract Address"
        value={tokenAddress}
        onChange={(e) => setTokenAddress(e.target.value)}
      />
      <input
        className="token-transfer-input"
        type="text"
        placeholder="Recipient Address"
        value={recipientAddress}
        onChange={(e) => setRecipientAddress(e.target.value)}
      />
      <input
        className="token-transfer-input"
        type="text"
        placeholder="Amount to Transfer"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button className="token-transfer-button" onClick={transferTokens}>Transfer Tokens</button>

      {status && <p className="token-transfer-status">{status}</p>}
    </div>
  );
};

export default TokenTransfer;
