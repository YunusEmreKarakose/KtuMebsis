var express = require('express');
var router = express.Router();
const mysql=require('./database');

/* POST AT */
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
/*Paylaşımları getir*/
router.get('/get', function(req, res, next) { 
  if(req.session.idNumber){ 
    
    let getquery='SELECT * FROM posts';
    mysql.query(getquery, function(err, result, fields) {
      if (err) {
      console.log(err.message);
      }else{
        var table='';
        var i=0;
        result.forEach(element => {
          table +='<tr><td>'+ result[i].pId  +'</td><td>'+ result[i].senderId  +'</td><td>'+ result[i].type +'</td><td>'+result[i].duration+'</td><td>'+ result[i].company +'</td><td>'+ result[i].period +'</td><td>'+ result[i].info +'</td></tr>';
          i++;
        });
        table ='<table border="1"></th><th>Post ID</th></th><th>Sender ID</th><th>Tip</th><th>Süre</th><th>Şirket</th><th>Periyot</th><th>Bilgi</th></tr>'+ table +'</table>';
        res.send(table);
      }
    });
  }else{
   res.redirect('/');
  }
});
/*Paylaşımları getir*/
router.get('/most', function(req, res, next) { 
  if(req.session.idNumber){ 

    let getquery='SELECT COUNT(senderId),senderId AS MOST FROM posts GROUP BY senderId ORDER BY senderId DESC';
    mysql.query(getquery, function(err, result, fields) {
      if (err) {
      console.log(err.message);
      }else{
        var most=result[0].MOST
        let mmmm='SELECT * FROM users WHERE idNumber=?';
          mysql.query(mmmm,most ,function(err, result, fields) {
            if (err) {
            console.log(err.message);
            }else{
                res.send(result[0].name+" "+result[0].surname+"  "+result[0].stuNum);
            }
          });
      }
    });
  }else{
   res.redirect('/');
  }
});
/* ANKET */
module.exports = router;