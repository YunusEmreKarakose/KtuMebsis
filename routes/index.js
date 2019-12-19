var express = require('express');
var router = express.Router();
const mysql=require('./database');

/* GET login page. or main page if logged */
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
    res.render('mainpage', { title: 'Express' });
  }else{
    console.log(" no session");
    res.redirect('/');
  }
});
//get company (firma oluştur)
router.get('/cmp', function(req, res, next) {
  if(req.session.idNumber){
    res.render('company', { title: 'Express' });
  }else{
    console.log(" no session");
    res.redirect('/');
  }
});
//Get ex page(eski çalışma bilgisi gir)
router.get('/ex', function(req, res, next) {
  if(req.session.idNumber){
    res.render('ex', { title: 'Express' });
  }else{
    console.log(" no session");
    res.redirect('/');
  }
});
//Get message page(mesaj atma sayfası)
router.get('/msg', function(req, res, next) {
  if(req.session.idNumber){
    res.render('message', { title: 'Express' });
  }else{
    console.log(" no session");
    res.redirect('/');
  }
});
//Get post page(paylaşım yapma sayfası)
router.get('/pst', function(req, res, next) {
  if(req.session.idNumber){
    res.render('post', { title: 'Express' });
  }else{
    console.log(" no session");
    res.redirect('/');
  }
});
//Get yorum page(paylaşım yapma sayfası)
router.get('/yrm', function(req, res, next) {
  if(req.session.idNumber){
    res.render('comment', { title: 'Express' });
  }else{
    console.log(" no session");
    res.redirect('/');
  }
});
//Get sorgu page(sorgulamalar)
router.get('/gt', function(req, res, next) {
  if(req.session.idNumber){
    res.render('sorgu', { title: 'Express' });
  }else{
    console.log(" no session");
    res.redirect('/');
  }
});
//Get progil page(kullanıcı bilgileri)
router.get('/prf', function(req, res, next) {
  if(req.session.idNumber){
    res.render('profile', { title: 'Express' });
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
