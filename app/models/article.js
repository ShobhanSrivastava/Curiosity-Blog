import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: { type: String, required: true },
    seo_title: { type: String, required: false },
    author_name: { type: String, required: true },
    description: { type: String, required: true },
    seo_description: { type: String, required: false },
    author_profile_url: { type: String, required: false },
    content: { type: String, required: true },
    likes: { type: Number },
    dislikes: { type: Number },
    comments: { type: [ String ] },
}, { timestamps: true });

export default mongoose.model('Article', articleSchema, 'articles');