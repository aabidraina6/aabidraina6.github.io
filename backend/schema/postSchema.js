const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const postSchema = new mongoose.Schema({
    text : {type : String},
    by : {type : ObjectId},
    in : {type : ObjectId},
    upvotes : [
        {
            _id : {type : ObjectId}
        }
    ] , 
    downvotes : [
        {
            _id : {type : ObjectId}
        }
    ] ,
    comments : [
        {
            _id : {type : ObjectId , default: mongoose.Types.ObjectId } , 
            username : {type: String} ,
            text : {type : String},
            by : {type : ObjectId}
        }
    ]
})
const postModel = mongoose.model("postschema" , postSchema)

module.exports = postModel