var express = require('express');
var router = express.Router();
const mysql=require('./database');

/* GET home page. */
router.post('/post', function(req, res, next) {  
  let post={
    senderId:req.body.senderId,
    type:req.body.type,
    duration:req.body.duration,
    company:req.body.company,
    period:req.body.period,
    info:req.body.info
  };
  
  let postquery='INSERT INTO posts SET ?';
  mysql.query(postquery,post, function(err, results, fields) {
    if (err) {
    console.log(err.message);
    }
  });
  res.render('index', { title: 'Express' });
});

module.exports = router;