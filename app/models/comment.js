import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    blog_id: { type: String, required: true },
    author_name: { type: String, required: true },
    author_email: { type: String, required: true },
    content: { type: String, required: true },
    likes: { type: Number },
    dislikes: { type: Number },
}, { timestamps: true });

export default mongoose.model('Comment', commentSchema, 'comments');