import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: { type: String, required: true },
    authorName: { type: String, required: true },
    description: { type: String, required: true },
    authorEmail: { type: String, required: true },
    content: { type: String, required: true },
    likes: { type: Number },
    dislikes: { type: Number },
    comments: { type: [ String ] },
}, { timestamps: true });

export default mongoose.model('Blog', blogSchema, 'blogs');