import mongoose from 'mongoose';
const { isValidObjectId } = mongoose;
import { Blog } from '../../models/index.js';

function blogController() {
    return {
        async allBlogs(req, res) {
            const blogs = await Blog.find();
            res.render('user/home', { blogs: blogs });
        },

        async getBlog(req, res) {
            const id = req.params.id;

            if(!isValidObjectId(id)) {
                return res.render('404');
            }

            const blog = await Blog.findById(id);
            console.log(blog);
            if(!blog) {
                return res.render('404');
            }

            res.render('user/blog', { blog: blog });
        },

        writeBlog(req, res) {
            const { title, content } = req.body;
            console.log(title, content);

            if(!title) {
                req.flash('error', 'Title is required');
                return res.redirect('/write');
            }

            if(!content || content === '') {
                req.flash('error', 'Content is required');
                return res.redirect('/write');
            }

            const blog = new Blog({
                title,
                content,
                authorName: req.user.name,
                authorEmail: req.user.email
            });

            blog.save()
            .then(savedBlog => {
                console.log(savedBlog);
                return res.redirect(`/${savedBlog._id}`);
            })
            .catch(err => {
                req.flash('error', 'Something went wrong');
                req.flash('title', title);
                req.flash('content', content);
                return res.redirect('/write');
            });
        },

        async myBlogs(req, res) {
            const user = req.user.email;

            const blogs = await Blog.find({ authorEmail: user.email });
            console.log(blogs);

            return res.render('user/myBlogs', { blogs: blogs });
        }
    }
}

export default blogController;