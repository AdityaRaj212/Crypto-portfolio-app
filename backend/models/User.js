import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tokens: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Token' }],
});

export default mongoose.model('User', UserSchema);;
