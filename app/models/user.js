import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  registrationDate: { type: Date, default: Date.now },
  posts: { type: [ String ] },
  comments: { type: [ String ] },
});

export default mongoose.model('User', userSchema, 'users');
