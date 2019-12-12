var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//db
const mysql=require('./routes/database');
//routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
//create mysql tables
//users
let usersTable = `create table if not exists users (
  userId int primary key auto_increment,
  nationality varchar(50) not null,
  idNumber int not null,
  name varchar(50)  not null,
  surname varchar(50) not null,
  birthdate varchar(50) not null,
  birthplace varchar(50) not null,
  phoneNum varchar(50) not null,
  adress varchar(200) not null,
  currentComp varchar(50) ,
  currentRole varchar(50) ,
  school varchar(50) not null,
  department varchar(50) not null,
  languages varchar(200) ,
  certificate varchar(200)                
)`;
mysql.query(usersTable, function(err, results, fields) {
  if (err) {
  console.log(err.message);
  }
});
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
