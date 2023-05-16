function authController() {
    return {
        login(req, res) {
            res.render('auth/login');
        }, 

        register(req, res) {
            res.render('auth/register');
        },

        postRegister(req, res) {
            console.log(req.body);
            const { name, email, password, confirm_password } = req.body;
        }
    }
}

export default authController;