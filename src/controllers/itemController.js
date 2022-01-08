// Get Data Models
const Item = require('../models/Item')

exports.view = async (req,reply) =>{
  reply.view("./src/views/index.ejs");
}
exports.view_create = async (req,reply) =>{
  reply.view("./src/views/create.ejs");
}
exports.view_edit = async (req,reply) =>{
  reply.view("./src/views/edit.ejs");
}
exports.view_delete = async (req,reply) =>{
  reply.view("./src/views/delete.ejs");
}
// Get all items
exports.getItems = async (req, reply) => {
  try {
    const items = await Item.find({})
    reply.send({success:true,items})
  } catch (err) {
    reply.send({success:false,error:err})
  }
}
// Get all items segregated group-wise
exports.getAllItemsGroupwise = async (req, reply) => {
  try {
    const items = await Item.aggregate([{$group: {
      "_id": "$group",
      "doc": {
        $push: {name:"$name",id:"$id"}
      }
    }}])
    reply.send({success:true,items})
  } catch (err) {
    reply.send({success:false,error:err})
  }
}
// Get items of a group
exports.getGroupwiseItems = async (req, reply) => {
  try {
    console.log(req.params)
    const group = req.params.group
    const items = await Item.find({'group':group})
    reply.send({success:true,items})
  } catch (err) {
    reply.send({success:false,error:err})
  }
}

// Add a new item
exports.createItem = async (req, reply) => {
  try {
    
    const new_item = new Item(req.body)
    var a = new_item.save()
    reply.send({success:true,msg:"new item created"})
  } catch (err) {
    reply.send({success:false,error:err})
  }
}

// // Update an existing item
exports.updateItem = async (req, reply) => {
  try {
    const id = req.params.id
    const item_data = req.body
    const { ...updateData } = item_data
    const update = await Item.findOneAndUpdate({_id:id}, updateData, { new: true })
    reply.send({success:true,msg:"item updated"})
  } catch (err) {
    reply.send({success:false,error:err})
  }
}

// Delete an item
exports.deleteItem = async (req, reply) => {
  try {
    const id = req.params.id
    const car = await Item.findOneAndDelete({_id:id})
    reply.send({success:true,msg:car+"item deleted"})
  } catch (err) {
    reply.send({success:false,error:err})
  }
}
