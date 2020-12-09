var express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();
const User = require('../db/userModel');
const session = require('express-session');
const passport = require('passport');
const { body } = require('express-validator');

router.use(bodyParser.json());

module.exports = router;