const express = require('express');
//middlewares
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const path = require('path');
const cookieParser = require('cookie-parser');

const Messages = require('./db/msgModel');
const Topics = require('./db/topicModel');

const mongoose = require('mongoose');
const passport = require('passport');
const User = require('./db/userModel');
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');
const url = 'mongodb://localhost:27017/ruoskadb';

//create express app
var app = express();

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false, // don't build indexes
    poolSize: 10, // maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, //close sockets after 45s of inactivity
    family: 4 // use IPv4, skip IPv6
}
mongoose.connect(url, options);

app.use(bodyParser.urlencoded({extended: true}));
app.use(require('express-session')({
    secret: 'TeoCrop.png ItkaKotka TM',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.set('views', path.join('__dirname', 'views'));

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//add morgan logger
app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/', (req, res)=>{
    res.json({
        message: 'RUOSKA App!'
    });
});


//Requests
app.get('/messages/register', (req, res) => {
    res.json('/register');
});
//user signup
app.post('/messages/register', (req, res) => {
    console.log('Attempted register');
    User.register(new User({username: req.body.username}), req.body.password, (err, user) =>{
        if(err){
            console.log(err);
            return res.json({message:'failed to register'});
        }
        passport.authenticate('local')(req, res, ()=>{
            res.json({goto:'/'});
            req.isLoggedIn(req, res, ()=>{
                console.log('Hey you!');
            });
        });
    });
});

app.get('/messages/login', (req, res)=>{
    console.log('GET login');
    res.json({message:'login'});
});
//login
app.post('/messages/login', passport.authenticate('local', {
    successRedirect: '/messages/login',
    failureRedirect: '/messages/register'
}), (req, res)=>{
    console.log('Hello');
    res.json({message:'User is '+ req.user.id});
});

//logout
app.get('/messages/logout', (req, res)=>{
    req.logout();
    res.redirect('/login');
});


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}




app.get('/messages', (req, res)=>{
    Messages.GetMessages().then( (messages)=>{
        res.json(messages);
    });
});

app.get('/messages/:topics', (req, res)=>{
    Topics.FindByValue({topic:"Maan yleisin alkuaine"}).then((topics)=>{
        res.json(topics);
    }).catch((err)=>{
        res.status(500);
        res.json(err);
    });
});

app.post('/messages/:topics', (req, res)=>{
    console.log(req.body);
    Topics.InsertMsg(req.body).then((message)=>{
        res.json(message);
    }).catch((err)=>{
        res.status(500);
        res.json(err);
    });
});

app.post('/messages/:newtopic', (req, res)=>{
    let topicobj = {topic:req.body.topic};
    Topics.InsertMsg(topicobj).then((message)=>{
        console.log(message);
    }).catch((err)=>{
        res.status(500);
        res.json(err);
    });
});

app.post('/messages', (req, res)=>{
    console.log(req.body);
    console.log(req.body.topic);
    console.log(req.session);
    Messages.InsertMsg(req.body).then((message)=>{
        res.json(message);
    }).catch((err)=>{
        res.status(500);
        res.json(err);
    });
});


const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Listening on ${port}`);
});