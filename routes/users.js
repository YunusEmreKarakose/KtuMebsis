var express = require('express');
var router = express.Router();
const mysql=require('./database');

/* Create User  */
router.post('/createUser', function(req, res, next) {
  let post={
    nationality:req.body.nationality,
    idNumber:req.body.idNumber,
    name:req.body.name,
    surname:req.body.surname,
    birthdate:req.body.birthdate,
    birthplace:req.body.birthplace,
    phoneNum:req.body.phoneNum,
    adress:req.body.adress,
    currentComp:req.body.currentComp,
    currentRole:req.body.currentRole,
    school:req.body.school,
    department:req.body.department,
    graduateyear:req.body.graduateyear,
    languages:req.body.languages,
    certificate:req.body.certificate,
    password:req.body.password
  };
  
  let postquery='INSERT INTO users SET ?';
  mysql.query(postquery,post, function(err, results, fields) {
    if (err) {
    console.log(err.message);
    }
  });
  res.redirect('/');
});

router.post('/login',function(req,res,next){
  var sessid=req.body.idNumber;
  var pass=req.body.password;
  
  let login='SELECT * FROM users WHERE idNumber=? AND password=?';
  mysql.query(login,[sessid,pass], function(err, results, fields) {
    if (err) {
      console.log(err.message);
      req.session.idNumber=0;
      res.redirect('/');
    }else{
      req.session.idNumber=sessid;
      req.session.password=pass;      
      res.redirect('/mp')
    }
  });
});
module.exports = router;