import { Blog } from '../../models/index.js';

function homeController() {
    return {
        async index(req, res) {
            const blogs = await Blog.find();
            console.log(blogs);
            res.render('user/home', { blogs: blogs });
        }
    }
}

export default homeController;