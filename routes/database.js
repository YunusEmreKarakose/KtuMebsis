const mysql=require('mysql');

//localhost
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'veri_odev_2019'
  });
  //bağlanma
  db.connect(function(err){
    if(err){    console.log("db connect hata"+err); throw err;}
    else{console.log("mysql baglandı");}
  });

module.exports=db;