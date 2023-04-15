const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {  ObjectId } = require('mongodb')

const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  userName: { type: String },
  email: { type: String },
  age: { type: Number },
  contactNumber: { type: Number },
  password: { type: String },
  tokens: [
    {
      token: { type: String },
    },
  ],
  followers: [
    {
      _id : {type : String} ,
      email: { type: String },
      name : {type : String}
    },
  ],
  following: [
    {
      _id : {type : String} , 
      email: { type: String },
      name : {type : String}

    },
  ],
  mysubs : [
    {
      _id : {type : ObjectId}
    }
  ], 
  savedposts : [
    {
      _id : {type : ObjectId}
    }
  ]
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password"))
    this.password = bcrypt.hashSync(this.password);
  next();
});

userSchema.methods.generateJwt = async function () {
  try {
    const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    console.log("from fn", token);

    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};


// email of the follower
userSchema.methods.follow = async function (email){
    try{
        const follower = await userModel.findOne({email:email})
        follower.following = follower.following.concat({email : this.email , name : this.firstName + ' ' + this.lastName})
        await follower.save()
        this.following = this.following.concat({email : follower.email, name : follower.firstName + ' ' + follower.lastName})
        await this.save()
    }catch(err){
        console.log(err)
    }
}

const userModel = mongoose.model("userData", userSchema);

module.exports = userModel;
