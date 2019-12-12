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
    languages:req.body.languages,
    certificate:req.body.certificate
  };
  
  let postquery='INSERT INTO users SET ?';
  mysql.query(postquery,post, function(err, results, fields) {
    if (err) {
    console.log(err.message);
    }
  });
  res.send('respond with a resource');
});

module.exports = router;