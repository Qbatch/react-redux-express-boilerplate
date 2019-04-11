var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1:27017/sampleLocalMongoDB';

mongoose.connect(mongoDB, { useNewUrlParser: true }).then(() => {
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
  // we're connected!
  console.log('connection is open now.......')
});

var Schema = mongoose.Schema;

var ItemSchema = new Schema({
  id: Schema.Types.ObjectId,
  name: String
});

var testModel = mongoose.model('TestModel', ItemSchema);

const test = new testModel({ name: "dsa" });
test.save();