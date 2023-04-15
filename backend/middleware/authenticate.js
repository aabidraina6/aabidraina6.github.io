const userModel = require("../schema/userSchema");
const jwt = require("jsonwebtoken");

const authenticate = async (req,res,next) => {
  try {
    const token = req.cookies.jwtoken;
    if(!token){throw new Error(`Invalid toked ,== ${token}`)}
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    const rootUser = await userModel.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });

    if (!rootUser) {
      throw new Error("Invalid token");
    } 
        req.token = token
        req.rootUser = rootUser
        req._id = rootUser._id
    
    next()
  } catch (err) {
    console.log(err);
  }
};

module.exports = authenticate;
