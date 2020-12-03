var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ruoskApp', description: 'The express solution to project management!' });
});

router.post('/', ()=>{
  res.render('post_test', {post_value: 'You submitted stuff'});
});

module.exports = router;
