var express = require('express');
var router = express.Router();
const mysql=require('./database');

/* */
router.post('/createComp', function(req, res, next) {
  if(req.session.idNumber){
    let post={
      name:req.body.name,
      phone:req.body.phone,
      adress:req.body.adress,
      info:req.body.info
    };  
    let postquery='INSERT INTO companies SET ?';
    mysql.query(postquery,post, function(err, results, fields) {
      if (err) {
      console.log(err.message);
      }
    });
    res.redirect('/cmp');
  }else{
    res.redirect('/');
  }
});

module.exports = router;
