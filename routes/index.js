var express = require('express');
var router = express.Router();
const mysql=require('./database');

/* GET login page. */
router.get('/', function(req, res, next) {
  if(req.session.idNumber){
    res.render('mainpage', { title: 'Express' });
  }else{
    res.render('login', { title: 'Express' });
  }
});
/*GET main page*/
router.get('/mp', function(req, res, next) {
  if(req.session.idNumber){
    console.log(req.session);    
    res.render('mainpage', { title: 'Express' });
  }else{
    console.log(" no session");
    res.redirect('/');
  }
});
//quit
router.get('/quit', function(req, res, next) {
    req.session.idNumber=0;
    req.session.password=null;
    res.redirect('/');  
});
module.exports = router;
