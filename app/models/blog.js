import mongoose from 'mongoose';
const Schema = mongoose.Schema;

import { Comment } from './index.js';

const blogSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    content: { type: String, required: true },
    likes: { type: Number },
    dislikes: { type: Number },
    comments: { type: [ String ] },
}, { timestamps: true });

export default mongoose.model('Blog', blogSchema, 'blogs');