import { articleController, authController, commentController } from "../http/controllers/index.js";
import checkAuthenticated from "../http/middlewares/guest.js";
import user from "../http/middlewares/user.js";

function initRoutes(app) {
    app.post('/comment', user, commentController().addComment);

    // my-blogs route GET
    app.get('/my-blogs', user, articleController().myArticles);
    
    // write GET
    app.get('/write', user, (req, res) => {
        res.render('user/writeArticle', { blog: null });
    })
    // write POST
    app.post('/write', user, articleController().writeArticle);

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
    app.get('/blog/:id', articleController().getArticle);
    // home GET
    app.get('/', articleController().allArticles);
}

export default initRoutes;