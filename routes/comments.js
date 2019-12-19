var express = require('express');
var router = express.Router();
const mysql=require('./database');

/* GET home page. */
router.post('/sendComment', function(req, res, next) {
  if(req.session.idNumber){
    let post={
      pId:req.body.pId,
      userId:req.session.idNumber,
      comment:req.body.comment,
      date:new Date()
    };
    
    let postquery='INSERT INTO comments SET ?';
    mysql.query(postquery,post, function(err, results, fields) {
      if (err) {
      console.log(err.message);
      }
    });
    res.redirect('/yrm');

  }else{
    res.redirect('/');
  }
});

module.exports = router;