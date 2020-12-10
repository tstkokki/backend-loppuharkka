var express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const User = require('../db/userModel');
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');
const url = 'mongodb://localhost:27017/ruoskadb';


var app = express();
mongoose.connect(url);

app.use(bodyParser.urlencoded({extended: true}));
app.use(require('express-session')({
    secret: 'TeoCrop.png ItkaKotka TM',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

