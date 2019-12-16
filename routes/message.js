var express = require('express');
var router = express.Router();
const mysql=require('./database');

/* GET home page. */
router.post('/sendMessage', function(req, res, next) {
  let post={
    senderId:req.body.senderId,
    targetId:req.body.targetId,
    message:req.body.message,
    date:new Date()
  };
  
  let postquery='INSERT INTO messages SET ?';
  mysql.query(postquery,post, function(err, results, fields) {
    if (err) {
    console.log(err.message);
    }
  });
  res.render('index', { title: 'Express' });
});

module.exports = router;