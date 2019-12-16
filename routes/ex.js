var express = require('express');
var router = express.Router();
const mysql=require('./database');

/* GET home page. */
router.post('/createEx', function(req, res, next) {
  let post={
    cId:req.body.cId,
    userId:req.body.userId,
    startyear:req.body.startyear,
    endyear:req.body.endyear
  };
  
  let postquery='INSERT INTO ex SET ?';
  mysql.query(postquery,post, function(err, results, fields) {
    if (err) {
    console.log(err.message);
    }
  });
  res.render('index', { title: 'Express' });
});

module.exports = router;