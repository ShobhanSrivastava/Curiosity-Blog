import mongoose from 'mongoose';
const { isValidObjectId } = mongoose;
import { Article, Comment } from '../../models/index.js';
import utility from '../../../utility/index.js';

function articleController() {
    return {
        // GET all articles
        async allArticles(req, res) {
            // Find all the articles in the database
            const articles = await Article.find();
            articles.forEach(article => {
                // Remove all the HTML tags from the article and reduce it to 300 words to show a glimpse of article
                article.content = utility.shortenContent(utility.removeHTML(article.content), 300) + "...";
            });

            console.log(articles);

            // Render home page and pass all the articles as input
            res.render('user/home', { articles: articles });
        },

        // Get article with id as parameter
        async getArticle(req, res) {
            // Get article ID from the user
            const id = req.params.id;

            // Check if it is a valid id
            if(!isValidObjectId(id)) {
                return res.render('404');
            }

            // Find the article with given id
            const article = await Article.findById(id);

            // Render 404 page if not found
            if(!article) {
                return res.render('404');
            }

            // Get all the comments on the article
            const comments = await Comment.find({ article_id: id });

            console.log(comments);

            // Render article page with article and the comments
            return res.render('user/article', { article: article, comments: comments });
        },

        // POST Write Article
        writeArticle(req, res) {
            // Extract title, content, description from request's body
            const { title, content, description } = req.body;
            console.log(title, content);

            // If any of the data is not present return an error with flash
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

            // Everything is alright, now create a new article object
            const article = new Article({
                title,
                content,
                description,
                author_name: req.user.name,
                author_email: req.user.email
            });

            // Save it in the database and check for any errors
            article.save()
            .then(savedArticle => {
                console.log(savedArticle);
                return res.redirect(`blog/${savedArticle._id}`);
            })
            .catch(err => {
                req.flash('error', 'Something went wrong');
                req.flash('title', title);
                req.flash('content', content);
                req.flash('description', description);
                return res.redirect('/write');
            });
        },

        // GET user's all articles
        async myArticles(req, res) {
            // Get the user email from the request
            const user = req.user.email;

            // Find all the articles of the user with field authorEmail
            const articles = await Article.find({ authorEmail: user.email });
            articles.forEach(article => {
                article.content = utility.shortenContent(utility.removeHTML(article.content), 300) + "...";
            });
            console.log(articles);

            // Render myBlogs page with articles as input
            return res.render('user/myBlogs', { articles: articles });
        }
    }
}

export default articleController;