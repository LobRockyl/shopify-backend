// External Dependancies
const mongoose = require('mongoose')
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
const ItemSchema = new Schema({
  name: String,
  group:{
    type: String,
    default: "Public"
  },
})

module.exports = mongoose.model('Item', ItemSchema)
