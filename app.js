var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
//db
const mysql=require('./routes/database');
//routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var companiesRouter = require('./routes/companies');
var commentsRouter = require('./routes/comments');
var exRouter = require('./routes/ex');
var messageRouter = require('./routes/message');
var postsRouter = require('./routes/posts');

var app = express();
//
app.use(session({
  secret: 'veriodev2k19',
  resave: false,
  saveUninitialized: true
}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//use routers
app.use('/', indexRouter);
app.use('/users', usersRouter);//mezunlar
app.use('/comment', commentsRouter);//yorum
app.use('/companies', companiesRouter);//firmalar
app.use('/ex', exRouter);//eski çalışma bilgileri
app.use('/message', messageRouter);//messajlar
app.use('/post', postsRouter);//paylaşım(staj iş ilanı)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
//create mysql tables
//users (mezunlar)
let usersTable = `create table if not exists users (
  userId int primary key auto_increment,
  nationality varchar(50) not null,
  idNumber int not null unique,
  password varchar(50) not null,
  name varchar(50)  not null,
  surname varchar(50) not null,
  birthdate varchar(12) not null,
  birthplace varchar(50) not null,
  phoneNum varchar(11) not null unique,
  adress varchar(200) not null,
  currentComp varchar(50) ,
  currentRole varchar(50) ,
  school varchar(50) not null,
  department varchar(50) not null,
  graduateyear int not null,
  languages varchar(200) ,
  certificate varchar(200)                
)`;
mysql.query(usersTable, function(err, results, fields) {
  if (err) {
  console.log(err.message);
  }
});
//companies (firma bilgileri)
let companiesTable = `create table if not exists companies ( 
    cId int primary key auto_increment,    
    name varchar(50) not null,
    phone varchar(11) not null unique,
    adress varchar(100) not null,
    info varchar(200) not null
)`;
mysql.query(companiesTable, function(err, results, fields) {
  if (err) {
  console.log(err.message);
  }
});
//posts(staj ve iş ilanları)
let posts = `create table if not exists posts ( 
  pId int primary key auto_increment,    
  senderId int not null,
  type varchar(11) not null,
  duration int,
  company varchar(50) not null,
  period varchar(10),
  info varchar(400) not null
)`;
mysql.query(posts, function(err, results, fields) {
if (err) {
console.log(err.message);
}
});
// eski çalışma durumları
let ex = `create table if not exists ex ( 
    cId int not null,
    userId int not null,
    startyear int not null,
    endyear int not null
)`;
mysql.query(ex, function(err, results, fields) {
if (err) {
console.log(err.message);
}
});
//comments
let comments = `create table if not exists comments ( 
  pId int not null,
  userId int not null,
  comment varchar(200) not null,
  date varchar(50) not null
)`;
mysql.query(comments, function(err, results, fields) {
if (err) {
console.log(err.message);
}
});
//message
let messages = `create table if not exists messages ( 
  mId int primary key auto_increment,
  senderId int not null,
  targetId int not null,
  message varchar(200) not null,
  date varchar(50) not null
)`;
mysql.query(messages, function(err, results, fields) {
if (err) {
console.log(err.message);
}
});
//tablolar oluşturuldu
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
