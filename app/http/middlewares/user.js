function user(req, res, next) {
    // If user is authenticated, pass the request to next middleware
    if(req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');
}

export default user;