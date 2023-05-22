function guest(req, res, next) {
    // If user is not authenticated, pass the request to next middleware
    if(!req.isAuthenticated()) {
        return next();
    }

    res.redirect('/');
}

export default guest;