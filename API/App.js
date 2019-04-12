
const express = require('express');
var bodyParser = require('body-parser');

const { markItemInMongo,deleteFromMongo,updateDataInMongo,getDataFromMongo,saveToMongo} = require('../src/DbConnectivity/MongoConnection');
var urlencodedParser = bodyParser.urlencoded({ extended: false })


var app = express();
app.use(express.json());

app.delete('/delete_data', function (req, res) {
  var resonseStatusCode = deleteFromMongo(req.body.index)
  resonseStatusCode.then(function (value) {
    res.sendStatus(value)
  }, function (err) {
    console.log(err)
  });
});

app.post('/mark_item', function (req, res) {
  var response = markItemInMongo(req.body.index,req.body.status)
  response.then(function (value) {
    res.send(value)
  }, function (err) {
    console.log(err)
  });
});

app.put('/update_item', urlencodedParser, function (req, res) {
  var newDocument = updateDataInMongo(req.body)

  newDocument.then(function (value) {
    res.send(value)
  },function (err) {
    console.log(err)
  });

});


app.post('/add_item',urlencodedParser, function (req, res) {
  var newDocument = saveToMongo(req.body)

  newDocument.then(function (value) {
    res.send(value)
  }, function (err) {
    console.log(err)
  });
});

app.get('/get_data', function (req, res) {
  var itemList = getDataFromMongo()
  itemList.then(function (value) {
    res.send(value)
  }, function (err) {
    console.log(err)
  });
});




var server = app.listen(8000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
})