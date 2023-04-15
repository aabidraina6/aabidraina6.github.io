const userModel = require("../schema/userSchema");
const subModel = require("../schema/subSchema");
const jwt = require("jsonwebtoken");

const subdata = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken;
    if (!token) {
      throw new Error("Invalid token");
    }
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    const rootUser = await userModel.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });

    if (!rootUser) {
      throw new Error("Invalid token");
    }
    req.rootUser = rootUser;
    next();
  } catch (err) {
    console.log(err);
  }
};

module.exports = subdata;
