import { homeController, authController } from "../http/controllers/index.js";

function initRoutes(app) {
    // home route GET
    app.get('/', homeController().index);
    
    // my-blogs route GET
    app.get('/my-blogs', (req, res) => {
        res.render('user/myBlogs');
    });
    
    // login route GET
    app.get('/login', authController().login);
    
    // register route GET
    app.get('/register', authController().register);
    app.post('/register', authController().postRegister);
}

export default initRoutes;