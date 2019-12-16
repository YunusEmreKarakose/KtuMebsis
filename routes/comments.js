var express = require('express');
var router = express.Router();
const mysql=require('./database');

/* GET home page. */
router.post('/sendComment', function(req, res, next) {
  let post={
    pId:req.body.pId,
    userId:req.body.userId,
    comment:req.body.comment,
    date:new Date()
  };
  
  let postquery='INSERT INTO comments SET ?';
  mysql.query(postquery,post, function(err, results, fields) {
    if (err) {
    console.log(err.message);
    }
  });
  res.render('index', { title: 'Express' });
});

module.exports = router;