import { User } from "../../models/index.js";
import bcrypt from 'bcrypt';
import passport from "passport";

function authController() {
    return {
        // GET login page
        login(req, res) {
            res.render('auth/login', { blog: null });
        }, 

        // POST login
        postLogin(req, res, next) {
            // authenticate with passport
            passport.authenticate('local', (err, user, info) => {
                // Send flash messages on any error or validation
                if(err) {
                    req.flash('error', info.message);
                    return next(err);
                }

                // If not logged in, redirect to login page
                if(!user) {
                    req.flash('error', info.message);
                    return res.redirect('/login');
                }

                // If everything is fine log in the user
                req.logIn(user, (err) => {
                    // If any error occurs, flash an error message
                    if(err) {
                        req.flash('error', info.message);
                        return next(err);
                    }

                    // If everything goes well, redirect the logged in user to the home
                    return res.redirect('/');
                })
            })(req, res, next);
        },

        // GET register page
        register(req, res) {
            res.render('auth/register');
        },

        // POST register
        async postRegister(req, res) {
            console.log(req.body);
            // Get user data from the request body
            const { name, email, password, confirm_password } = req.body;

            // Check if all the details are present
            if(!name || !email || !password || !confirm_password) {
                req.flash('error', 'All fields are required');
                req.flash('name', name);
                req.flash('email', email);
                return res.redirect('/register');
            }
            
            // Check if user password and confirm passwords match
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

            // Save the user
            user.save().then((user) => {
                //Login user
                return res.redirect('/login');
            })
            .catch((err) => {
                req.flash('error', 'Something went wrong!');
                return res.redirect('/register');
            })
        },

        // POST logout
        logout(req, res, next) {
            // logout the user
            req.logout((err) => {
                return next(err);
            });

            // redirect user to the login page
            return res.redirect('/login');
        }
    }
}

export default authController;