import mongoose from 'mongoose';

const TokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  address: { type: String, required: true },
  balance: { type: Number, required: true },
  symbol: { type: String },
  name: { type: String },
});

export default mongoose.model('Token', TokenSchema);
