var express = require('express');
var router = express.Router();
const mysql=require('./database');

/* GET home page. */
router.post('/createComp', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;