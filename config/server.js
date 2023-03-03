require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: process.env.JWT_SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  maxAge: process.env.EXPIRES_IN
}));
app.use(passport.initialize());
app.use(passport.session());

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: 'Internal Server Error',
  });
});

let routes = require('../routes/api'); //importing route
routes(app); //register the route

module.exports = app;