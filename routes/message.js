var express = require('express');
var router = express.Router();
const mysql=require('./database');

/* SEND MESSAGE */
router.post('/sendMessage', function(req, res, next) {
  if(req.session.idNumber){
    let post={
      senderId:req.session.idNumber,
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
    res.redirect('/msg');
  }else{
    res.redirect('/');
  }
});
/* SEE MESSAGES */
router.get('/seeMessage', function(req, res, next) {
  if(req.session.idNumber){    
    let postquery='SELECT * FROM messages WHERE targetId=?';
    mysql.query(postquery,req.session.idNumber, function(err, result, fields) {
      if (err) {
      console.log(err.message);
      }else{
        var table='';
        var i=0;
        result.forEach(element => {
          table +='<tr><td>'+ result[i].senderId  +'</td><td>'+ result[i].message  +'</td><td>'+ result[i].date  +'</td></tr>';
          i++;
        });
        table ='<table border="1"></th><th>GÖNDEREN</th></th><th>MESAJ</th><th>TARİH</th></tr>'+ table +'</table>';
        res.send(table);
      }
    });
  }else{
    res.redirect('/');
  }
});

module.exports = router;