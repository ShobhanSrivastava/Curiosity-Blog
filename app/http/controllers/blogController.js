import mongoose from 'mongoose';
const { isValidObjectId } = mongoose;
import { Blog, Comment } from '../../models/index.js';
import utility from '../../../utility/index.js';

function blogController() {
    return {
        async allBlogs(req, res) {
            const blogs = await Blog.find();
            blogs.forEach(blog => {
                blog.content = utility.shortenContent(utility.removeHTML(blog.content), 300) + "...";
            });

            console.log(blogs);

            res.render('user/home', { blogs: blogs });
        },

        async getBlog(req, res) {
            const id = req.params.id;

            if(!isValidObjectId(id)) {
                return res.render('404');
            }

            const blog = await Blog.findById(id
            //     , (err) => {
            //     req.flash('error', 'Something went wrong!');
            //     return res.render('/');
            // }
            );

            if(!blog) {
                return res.render('404');
            }

            const comments = await Comment.find({ blog_id: id }
            //     , err => {
            //     return res.render('/404');
            // }
            );

            console.log(comments);

            return res.render('user/blog', { blog: blog, comments: comments });
        },

        writeBlog(req, res) {
            const { title, content, description } = req.body;
            console.log(title, content);

            if(!title) {
                req.flash('error', 'Title is required');
                return res.redirect('/write');
            }

            if(!content || content === '') {
                req.flash('error', 'Content is required');
                return res.redirect('/write');
            }

            if(!description || description === '') {
                req.flash('error', 'Content is required');
                return res.redirect('/write');
            }

            const blog = new Blog({
                title,
                content,
                description,
                author_name: req.user.name,
                author_email: req.user.email
            });

            blog.save()
            .then(savedBlog => {
                console.log(savedBlog);
                return res.redirect(`blog/${savedBlog._id}`);
            })
            .catch(err => {
                req.flash('error', 'Something went wrong');
                req.flash('title', title);
                req.flash('content', content);
                req.flash('description', description);
                return res.redirect('/write');
            });
        },

        async myBlogs(req, res) {
            const user = req.user.email;

            const blogs = await Blog.find({ authorEmail: user.email });
            blogs.forEach(blog => {
                blog.content = utility.shortenContent(utility.removeHTML(blog.content), 300) + "...";
            });
            console.log(blogs);

            return res.render('user/myBlogs', { blogs: blogs });
        }
    }
}

export default blogController;