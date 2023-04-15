const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const subSchema = new mongoose.Schema({
  name: { type: String , index : 'text'},
  desc: { type: String },
  tags: [
    {
      tag: { type: String },
    },
  ],
  banned: [
    {
      word: { type: String },
    },
  ],
  posts: [
    {
      _id: { type: ObjectId },
    },
  ],
  requests: [
    {
      _id: { type: ObjectId },
      name :{type : String},
  
    },
  ],
  users: [
    {
      _id: { type: ObjectId },
      name :{type : String},
      isBlocked : {type:Boolean}
    },
  ],
  reports: [
    {
      _id: { type: String },
    },
  ],
});

const subModel = mongoose.model("subschema" , subSchema)

module.exports = subModel
