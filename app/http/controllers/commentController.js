import { Comment } from "../../models/index.js";

function commentController() {
    return {
        addComment(req, res) {
            console.log(req.body); 
            const { blog_id, content } = req.body; 

            if(!content) {
                req.flash('error', 'Comment cannot be empty');
                console.log('error', 'Comment cannot be empty');
                return res.redirect(`/blog/${blog_id}`);
            }

            const { name, email } = req.user;
            // console.log(name, email);

            const comment = new Comment({
                blog_id, 
                content,
                author_name: name,
                author_email: email
            });

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