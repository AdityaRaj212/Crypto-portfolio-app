import express from 'express';
import Token from '../models/Token.js';
import { provider, ethers } from '../utils/web3.js';
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

router.post('/add', authenticate, async (req, res) => {
  const { address } = req.body;
  try {
    const tokenContract = new ethers.Contract(address, [
      'function balanceOf(address) view returns (uint256)',
      'function symbol() view returns (string)',
      'function name() view returns (string)',
    ], provider);

    const balance = await tokenContract.balanceOf(req.userId);
    const symbol = await tokenContract.symbol();
    const name = await tokenContract.name();

    const newToken = new Token({
      userId: req.userId,
      address,
      balance: ethers.utils.formatEther(balance),
      symbol,
      name,
    });

    await newToken.save();
    res.status(201).json(newToken);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/list', authenticate, async (req, res) => {
  try {
    const tokens = await Token.find({ userId: req.userId });
    res.json(tokens);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
