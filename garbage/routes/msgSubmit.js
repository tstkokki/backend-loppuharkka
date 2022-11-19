var express = require('express');
var router = express.Router();


//mongodb set up
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const url = 'mongodb://localhost:27017/ruoskadb';

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

var connect = mongoose.connect(url, options);

const Users = require('../models/User');


/* GET users listing. */
router.POST('/', function(req, res, next) {

  connect.then((db) =>{
    Users.insertMany([{
      username: "Oiva",
      password: "Oivallinen"
    }])
  }).then((_user)=>{
    return Users.find({}).exec();
  }).then((p_users)=>{
    p_users.forEach(user => {
      console.log(user);
    });
  }).catch((err)=>{
    console.log(err);
  });
  
  res.send('index', {msg_content: 'MORO'});
});

module.exports = router;
