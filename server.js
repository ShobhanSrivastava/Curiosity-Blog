import express from 'express';
// express library lets you create a node server with little code and has some more features
const app = express();

// express-ejs-layouts let you create a common layout file for all the pages
import expressLayouts from 'express-ejs-layouts';
import flash from 'express-flash';

import session from 'express-session';
import passport from 'passport';

import connectMongo from 'connect-mongo';
const MongoDBStore = connectMongo;

import path from 'path';

// Fetch path from env
import { PORT, COOKIE_SECRET, DB_CONN } from './app/config/index.js';

// Creating __dirname
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import connect from './app/config/mongoConnection.js';

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use expressLayouts to enable layout.ejs as the common layout file for all the pages
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/resources/views'));

app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

// Set template engine
app.set('view engine', 'ejs');

// Connect to mongodb database
connect();

// Session middleware for creating session for every user
app.use(session({
    secret: COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoDBStore.create({
        mongoUrl: DB_CONN,
    }),
    cookie: { maxAge: 24 * 60 * 60 * 1000 } //24 hours
}));

// Passport config
import passportInit from './app/config/passport.js'
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req, res, next) => {
    res.locals.session = req.session;
    res.locals.user = req.user;
    next();
})

// Route handling in a seperate function
import routes from './app/routes/web.js';
routes(app);

// Listen to the incoming requests
app.listen(PORT, () => {
    console.log('Running on PORT', PORT);
})