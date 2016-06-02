var express = require("express");
var http = require("http");
var app = express();
var time = require('datejs');

var unixReg = /[0-9]{10}/;
var dateReg = /[A-Z][a-z]+[\s][\d]+[,]+\s[\d]+/g;
var json ={};

app.get("/:data", function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  var str = req.params.data.toString();

  if(unixReg.test(str)){
  	var date = new Date(parseInt(str) * 1000);
    json.unix = str;
  	json.natural = date.toString("MMMM dd, yyyy");

  }else if(dateReg.test(str)){
  	json.unix = Date.parse(str).getTime() / 1000;
  	json.natural = str;

  }else{
  	json.unix = null;
  	json.natural = null;

  }

	res.send(json);
  console.log(req.url, "recieved", json);

});

http.createServer(app).listen(1337);
