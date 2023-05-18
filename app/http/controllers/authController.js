import { User } from "../../models/index.js";
import bcrypt from 'bcrypt';
import passport from "passport";

function authController() {
    return {
        login(req, res) {
            res.render('auth/login', { blog: null });
        }, 

        postLogin(req, res, next) {
            passport.authenticate('local', (err, user, info) => {
                if(err) {
                    req.flash('error', info.message);
                    return next(err);
                }

                if(!user) {
                    req.flash('error', info.message);
                    return res.redirect('/login');
                }

                req.logIn(user, (err) => {
                    if(err) {
                        req.flash('error', info.message);
                        return next(err);
                    }
                    return res.redirect('/');
                })
            })(req, res, next);
        },

        register(req, res) {
            res.render('auth/register');
        },

        async postRegister(req, res) {
            console.log(req.body);
            const { name, email, password, confirm_password } = req.body;

            if(!name || !email || !password || !confirm_password) {
                req.flash('error', 'All fields are required');
                req.flash('name', name);
                req.flash('email', email);
                return res.redirect('/register');
            }
            
            if(password !== confirm_password) {
                req.flash('error', 'Passwords dont match');
                req.flash('name', name);
                req.flash('email', email);
                return res.redirect('/register');
            }

            // Check if user already exists
            User.exists( { email }, (err, result) => {
                if(result) {
                    req.flash('error', 'Email already registered');
                    req.flash('name', name);
                    req.flash('email', email);
                    return res.redirect('/register');
                }
            })

            // Everything is fine, we can now Register user

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({
                name, 
                email, 
                password: hashedPassword
            });

            user.save().then((user) => {
                //Login user
                return res.redirect('/login');
            })
            .catch((err) => {
                req.flash('error', 'Something went wrong!');
                return res.redirect('/register');
            })
        },

        logout(req, res, next) {
            req.logout((err) => {
                return next(err);
            });
            return res.redirect('/login');
        }
    }
}

export default authController;