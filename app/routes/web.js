import { blogController, authController } from "../http/controllers/index.js";
import checkAuthenticated from "../http/middlewares/guest.js";
import user from "../http/middlewares/user.js";

function initRoutes(app) {
    // my-blogs route GET
    app.get('/my-blogs', user, blogController().myBlogs);
    
    app.get('/write', user, (req, res) => {
        res.render('user/writeBlog');
    })
    app.post('/write', user, blogController().writeBlog);

    // login route GET
    app.get('/login', checkAuthenticated, authController().login);
    app.post('/login', authController().postLogin);
    
    // register route GET
    app.get('/register', checkAuthenticated, authController().register);
    app.post('/register', authController().postRegister);
    
    app.post('/logout', authController().logout);

    // home route GET
    app.get('/blog/:id', blogController().getBlog);
    app.get('/', blogController().allBlogs);
}

export default initRoutes;