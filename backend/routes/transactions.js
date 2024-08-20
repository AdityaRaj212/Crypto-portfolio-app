import express from 'express';
import { ethers } from '../utils/web3.js';
const router = express.Router();

const authenticate = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Unauthorized' });
    req.userId = decoded.userId;
    next();
  });
};

router.post('/transfer', authenticate, async (req, res) => {
  const { tokenAddress, recipient, amount } = req.body;
  try {
    const provider = new ethers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const tokenContract = new ethers.Contract(tokenAddress, [
      'function transfer(address to, uint amount) returns (bool)',
    ], signer);

    const tx = await tokenContract.transfer(recipient, ethers.utils.parseEther(amount));
    await tx.wait();

    res.json({ message: 'Transaction successful!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
