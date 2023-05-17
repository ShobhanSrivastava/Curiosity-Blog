import { blogController, authController } from "../http/controllers/index.js";
import checkAuthenticated from "../http/middlewares/guest.js";
import user from "../http/middlewares/user.js";

function initRoutes(app) {
    // my-blogs route GET
    app.get('/my-blogs', user, blogController().myBlogs);
    
    // write GET
    app.get('/write', user, (req, res) => {
        res.render('user/writeBlog');
    })
    // write POST
    app.post('/write', user, blogController().writeBlog);

    // login route GET
    app.get('/login', checkAuthenticated, authController().login);
    // login POST
    app.post('/login', authController().postLogin);
    
    // register route GET
    app.get('/register', checkAuthenticated, authController().register);
    // register POST
    app.post('/register', authController().postRegister);
    
    // logout POST
    app.post('/logout', authController().logout);

    // get blog with id GET
    app.get('/blog/:id', blogController().getBlog);
    // home GET
    app.get('/', blogController().allBlogs);
}

export default initRoutes;