var express = require('express');
var router = express.Router();
const mysql=require('./database');

/* Eski Çalışma bilgileri oluştur */
router.post('/createEx', function(req, res, next) {
  if(req.session.idNumber){
      //get cId from companies table
      var q1="SELECT * FROM companies WHERE name=?";
      let qqq=mysql.query(q1,req.body.name,function(err, results, fields) {
            if (err) {
              console.log(err.message);
            }else{               
              let post={
                cId:results[0].cId,
                userId:req.session.idNumber,
                startyear:req.body.startyear,
                endyear:req.body.endyear
              };   
              setEx(post);
            }
        });
      //
      res.redirect('/ex');
  }else{
    res.redirect('/');
  }  
});
// eski çalışma bilgisini kaydet
function setEx(post){   
  let postquery='INSERT INTO ex SET ?';
  mysql.query(postquery,post, function(err, results, fields) {
    if (err) {
    console.log(err.message);
    }
  });
}
module.exports = router;