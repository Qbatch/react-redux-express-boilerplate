var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
  id: Schema.Types.ObjectId,
  text: String,
  completed: Boolean
});

var returnedModel = mongoose.model('Item', ItemSchema);
module.exports = {
  ItemModel: mongoose.model('Item', ItemSchema)
} 


