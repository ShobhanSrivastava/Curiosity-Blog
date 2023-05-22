import { Comment } from "../../models/index.js";

function commentController() {
    return {
        // POST add comment
        addComment(req, res) {
            // Extract data from request body
            const { blog_id, content } = req.body; 

            // If some content is missing, flash an error
            if(!content) {
                req.flash('error', 'Comment cannot be empty');
                console.log('error', 'Comment cannot be empty');
                return res.redirect(`/blog/${blog_id}`);
            }

            // Get the user name and user email as the comment author's data
            const { name, email } = req.user;

            // New comment object
            const comment = new Comment({
                blog_id, 
                content,
                author_name: name,
                author_email: email
            });

            // Save comment and handle if any error
            comment.save()
            .then(comment => {
                console.log(comment);
                return res.redirect(`/blog/${blog_id}`);
            })
            .catch(err => {
                req.flash('content', content);
                req.flash('error', 'Something went wrong!');
                console.log('error', 'Something went wrong!');
                return res.redirect(`/blog/${blog_id}`);
            });
        }
    }
}

export default commentController;