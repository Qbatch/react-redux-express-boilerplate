//Import the mongoose module
/*var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1:27017/sampleLocalMongoDB';
mongoose.connect(mongoDB, { useNewUrlParser: true });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));*/


var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');  
app.use(cookieParser());


app.use(function (req, res, next) {
  console.log('%s %s', req.method, req.url);
  next();
}); 


app.get('/cookie', function (req, res) {
  res.send('I am Deleted!');
});
app.get('/', function (req, res) {
  res.send('I am sdasda!');
});  


app.delete('/del_student', function (req, res) {
  const { userId } = req.params.userId;
  console.log("Got a DELETE request for /del_student");
  res.send('I am Deleted!');
})

app.get('/enrolled_student', function (req, res) {
  console.log("Got a GET request for /enrolled_student");
  res.send('I am an enrolled student.');
})

// This responds a GET request for abcd, abxcd, ab123cd, and so on  
app.get('/ab*cd', function (req, res) {
  console.log("Got a GET request for /ab*cd");
  res.send('Pattern Matched.');
})

var server = app.listen(8000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
})