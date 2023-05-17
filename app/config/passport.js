import { Strategy as LocalStrategy } from "passport-local"; 
import { User } from "../models/index.js";
import bcrypt from 'bcrypt';

function init(passport) {
    passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        // Check if user exists in the database
        const user = await User.findOne({ email: email });
        if(!user) {
            return done(null, false, { message: 'No user found with this email '});
        }

        bcrypt.compare(password, user.password)
        .then(match => {
            if(match) {
                return done(null, user, { message: 'Logged in successfully '});
            }
            else {
                return done(null, false, { message: 'Wrong username or password '});
            }
        })
        .catch(err => {
            return done(null, false, { message: 'Something went wrong!'});
        })
    }));

    passport.serializeUser((user, done) => {
        done(null, user.email);
    });

    passport.deserializeUser((email, done) => {
        User.findOne({ email: email }, (err, user) => {
            done(err, user);
        })
    });
}

export default init;