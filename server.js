const express = require('express');
const app = express();
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');

// Fetch PORT from env
const PORT = process.env.PORT || 8000;

// Set template engine
app.use(expressLayouts);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('user/home');
});

app.get('/my-blogs', (req, res) => {
    res.render('user/myBlogs');
});

app.get('/login', (req, res) => {
    res.render('auth/login');
});

app.get('/register', (req, res) => {
    res.render('auth/register');
});

app.listen(PORT, () => {
    console.log('Running on PORT', PORT);
})