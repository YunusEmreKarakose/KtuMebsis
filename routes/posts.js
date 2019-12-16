var express = require('express');
var router = express.Router();
const mysql=require('./database');

/* GET home page. */
router.post('/post', function(req, res, next) { 
  if(req.session.idNumber){ 
    let post={
      senderId:req.session.idNumber,
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
    res.redirect('/pst');
  }else{
    res.redirect('/');
  }
});

module.exports = router;