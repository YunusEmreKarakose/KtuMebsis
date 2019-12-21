var express = require('express');
var router = express.Router();
const mysql=require('./database');

/* En çok mezunun çalıştığı firma görüntülenebilmelidir. */
router.get('/get1', function(req, res, next) {
  if(req.session.idNumber){
    let getquery='SELECT COUNT(currentComp) AS c,currentComp AS most FROM users GROUP BY currentComp ORDER BY Count(currentComp) DESC';
    mysql.query(getquery, function(err, results, fields) {
      if (err) {
      console.log(err.message);
      }else{
        var m=results[0].most;
        var cc=results[0].c
        res.send("en çok  "+m+" şirketinde "+cc+" kişi çalışıyor");
      }
    });
  }else{
    res.redirect('/');
  }
});
/*Iş ilanları; çalışma alanına ve firmaya göre filtrelenebilmelidir. */
router.post('/get2', function(req, res, next) {
    if(req.session.idNumber){
      if(req.body.type){
        let getquery="SELECT * FROM posts WHERE type=?"         
        mysql.query(getquery,req.body.type, function(err, results, fields) {
          if (err) {
          console.log(err.message);
          }else{
            res.send(results);
          }
        });
      }else if(req.body.name){
        let getquery="SELECT * FROM posts WHERE company=?"         
        mysql.query(getquery,req.body.name, function(err, results, fields) {
          if (err) {
          console.log(err.message);
          }else{
            res.send(results);
          }
        });
      }
    }else{
      res.redirect('/');
    }
});
/*Staj ilanları ise staj dönemi, süresi ve firmaya göre filtrelenebilmelidir.  */
router.post('/get3', function(req, res, next) {
    if(req.session.idNumber){
      if(req.body.period){
        let getquery="SELECT * FROM posts WHERE period=?"         
        mysql.query(getquery,req.body.period, function(err, results, fields) {
          if (err) {
          console.log(err.message);
          }else{
            res.send(results);
          }
        });
      }else if(req.body.name){
        let getquery="SELECT * FROM posts WHERE company=?"         
        mysql.query(getquery,req.body.name, function(err, results, fields) {
          if (err) {
          console.log(err.message);
          }else{
            res.send(results);
          }
        });
      }else if(req.body.duration){
        let getquery="SELECT * FROM posts WHERE duration=?"         
        mysql.query(getquery,req.body.duration, function(err, results, fields) {
          if (err) {
          console.log(err.message);
          }else{
            res.send(results);
          }
        });
      }
    }else{
      res.redirect('/');
    }
});
/* toplam mezun sayısı */
router.get('/get4', function(req, res, next) {
  if(req.session.idNumber){
    let getquery='SELECT COUNT(idNumber) AS c FROM users';
    mysql.query(getquery, function(err, results, fields) {
      if (err) {
      console.log(err.message);
      }else{
        var cc=results[0].c
        res.send("sistemde "+cc+" mezun kayıtlı");
      }
    });
  }else{
    res.redirect('/');
  }
});
/* toplam şirket sayısı */
router.get('/get5', function(req, res, next) {
  if(req.session.idNumber){
    let getquery='SELECT COUNT(cId) AS c FROM companies';
    mysql.query(getquery, function(err, results, fields) {
      if (err) {
      console.log(err.message);
      }else{
        var cc=results[0].c
        res.send("sistemde "+cc+" şirket kayıtlı");
      }
    });
  }else{
    res.redirect('/');
  }
});
/* hangi firmada kaç tane mezun var */
router.get('/get6', function(req, res, next) {
  if(req.session.idNumber){
    let getquery='SELECT COUNT(currentComp) AS c,currentComp FROM users  GROUP BY currentComp';
    mysql.query(getquery, function(err, results, fields) {
      if (err) {
      console.log(err.message);
      }else{
        res.send(results);
      }
    });
  }else{
    res.redirect('/');
  }
});
/* öğrenci no ile anket sorgula*/
router.post('/get7', function(req, res, next) {
  if(req.session.idNumber){
    let getquery='SELECT * FROM anket WHERE stuNum=?';
    mysql.query(getquery,req.body.stuNum, function(err, results, fields) {
      if (err) {
      console.log(err.message);
      }else{
        if(results.length>0){            
          res.send(results);
        }else{
          res.send("anket "+req.body.stuNum+" tarafından doldurulmamış");
        }
      }
    });
  }else{
    res.redirect('/');
  }
});
module.exports = router;