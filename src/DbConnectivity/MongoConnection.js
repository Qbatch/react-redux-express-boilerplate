var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1:27017/sampleLocalMongoDB';
var {Item} = require('../Models/Item')
var {ItemModel} =require('../Models/SchemaForItems');

let itemsArray = []

function getDataFromMongo() {

  var promise = new Promise(function (resolve, reject) {

    mongoose.connect(mongoDB, { useNewUrlParser: true }).then(() => { });
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', function () {
      console.log('connection is open now.......');

      ItemModel.find({}, function (err, docs) {
        if (err){
          reject(err);
        }else{
          itemsArray = docs;
          resolve(itemsArray);
        }
      });
    });
  });
  return promise;
}


function saveToMongo(item){

  var promise = new Promise(function (resolve, reject){

    mongoose.connect(mongoDB, { useNewUrlParser: true }).then(() => { });
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));

    db.once('open', function () {
      console.log('connection is open now.......');

        var itemModels = new Item(item.text, item.completed);
        db.collection("items").insertOne(itemModels)

        ItemModel.find({}, function (err, docs) {
          if (err) {
            reject(err);
          }else{
            itemsArray = docs;
            resolve(itemsArray);
          }
        });
    });
  });
  
  return promise;
}

function updateDataInMongo(itemToBeUpdated){
    var promise = new Promise(function (resolve, reject) {

    
    mongoose.connect(mongoDB, { useNewUrlParser: true }).then(() => { });
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));

    db.once('open', function () {
      console.log('connection is open now.......');

      ItemModel.findById(itemToBeUpdated.id, function (err, docs) {

        if (docs===null){
          reject("Cannot delete item that is pended for update!")
        }else{

          if (err) {
            reject(err);
          } else {
              docs.text = itemToBeUpdated.data;
              docs.save()
              resolve(docs);
          }
        }
    
      });

    });
  });
  return promise;
}

function deleteFromMongo(index){
  var promise = new Promise(function (resolve, reject) {

    mongoose.connect(mongoDB, { useNewUrlParser: true }).then(() => { });
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));

    db.once('open', function () {
      console.log('connection is open now.......');

      ItemModel.deleteOne({ _id: index }, function (err,data) {
        if (err){
          reject(err)
        }else{
          resolve(200)
        }
        
      }); 

    });
  });
  return promise;
}

function markItemInMongo(id,flag) {

  var promise = new Promise(function (resolve, reject) {

    mongoose.connect(mongoDB, { useNewUrlParser: true }).then(() => { });
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));

    db.once('open', function () {
      console.log('connection is open now.......');

      ItemModel.findById(id, function (err, docs) {
        if (err){
          reject(err)
        }else{
          docs.completed = flag;
          docs.save()
          console.log("updated doc is :" + docs)
          resolve(docs);
        }
      });
    });
  });
  return promise;
}


module.exports = {
  markItemInMongo: markItemInMongo,
  updateDataInMongo: updateDataInMongo,
  deleteFromMongo: deleteFromMongo,
  getDataFromMongo: getDataFromMongo,
  saveToMongo: saveToMongo,
  itemsArray: itemsArray
}





