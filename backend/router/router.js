const express = require("express");
const router = express.Router();
const userModel = require("../schema/userSchema");
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");
const subModel = require("../schema/subSchema");
const postModel = require("../schema/postSchema");
const subdata = require("../middleware/subdata");

router.get("/profile", authenticate, async (req, res) => {
  console.log("profilepage");
  res.send(req.rootUser);
});

router.get("/:username/data", async (req, res) => {
  try {
    const subname = req.params.username;
    console.log(subname);
    const users = await subModel.findOne({ name: subname });
    console.log(users.users);
    res.send(users);
  } catch (err) {
    console.log(err);
  }
});

router.get("/post/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const post = await postModel.findOne({ _id: id });
    const user = await userModel.findOne({ _id: post.by });
    post.user = user;
    const data = {
      post,
      user,
    };

    console.log(post.user.firstName);
    res.send(data);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id/userdata", async (req, res) => {
  try {
    const userid = req.params.id;
    console.log(userid);
    const users = await userModel.find({ _id: userid });

    res.send(users);
  } catch (err) {
    console.log(err);
  }
});

router.get("/mysubgreddits", subdata, async (req, res) => {
  console.log("subssend");
  const usersubs = req.rootUser.mysubs;
  var subs = [];
  for (let i = 0; i < usersubs.length; i++) {
    const details = await subModel.findOne({ _id: usersubs[i]._id });
    subs.push(details);
  }
  res.send(subs);
});

router.get("/allsubs", async (req, res) => {
  console.log("allsubs");
  const details = await subModel.find({});
  console.log("lenn", Object.keys(details).length);
  // console.log('dfasfadsf',details)
  res.send(details);
});

router.get("/search", async (req, res) => {
  try {
    const { query } = req.query;
    const results = await subModel.find({ $text: { $search: `\"${query}\"` } });
    console.log(results);
    res.send(results)
  } catch (err) {
    console.log(err);
  }
});

router.post("/join", authenticate, async (req, res) => {
  try {
    const user = req.rootUser;
    const { sub } = req.body;
    const subdata = await subModel.findOne({ _id: sub._id });
    subdata.requests = subdata.requests.concat({
      _id: user._id,
      name: user.firstName + " " + user.lastName,
    });
    subdata.save();
  } catch (err) {
    console.log(err);
  }
});

router.post("/post/setlike", authenticate, async (req, res) => {
  try {
    const { _id, like, unlike, dis, undis } = req.body;
    const userid = req.rootUser._id;
    const post = await postModel.findOne({ _id });
    if (like) {
      post.upvotes = post.upvotes.concat({ _id: userid });
    }
    if (unlike) {
      const index = post.upvotes.findIndex((obj) => obj._id === userid);
      post.upvotes.splice(index, 1);
    }
    if (dis) {
      post.downvotes = post.downvotes.concat({ _id: userid });
    }
    if (undis) {
      const index = post.downvotes.findIndex((obj) => obj._id === userid);
      post.downvotes.splice(index, 1);
    }
    await post.save();
    res
      .status(200)
      .json({ likes: post.upvotes.length, dislikes: post.downvotes.length });
  } catch (err) {
    console.log(err);
  }
});

router.post("/post/save", authenticate, async (req, res) => {
  try {
    var message;
    var status;
    const { posts, save } = req.body;
    console.log(posts);
    const userid = req.rootUser._id;
    // console.log(posts._id)
    var notsaved = true;
    for (let i = 0; i < req.rootUser.savedposts.length; i++) {
      if (req.rootUser.savedposts[i]._id.equals(posts._id)) {
        notsaved = false;
        break;
      }
    }
    console.log("notsvaed", notsaved);
    var user = await userModel.findOne({ _id: userid });
    console.log(save);
    if (notsaved && save) {
      user.savedposts = user.savedposts.concat({ _id: posts._id });
      message = "post  saved";
      status = 200;
    } else if (!save) {
      user.savedposts.splice(user.savedposts.indexOf({ _id: posts._id }));
      status = 204;
    } else {
      message = "post already saved";
      status = 409;
    }

    user.save();
    res.status(status).json({ message: "SDF" });
  } catch (err) {
    console.log(err);
  }
});

router.post("/post/addcomment", authenticate, async (req, res) => {
  try {
    const { by, _id, comment } = req.body;
    const userid = req.rootUser._id;
    const post = await postModel.findOne({ _id });
    post.comments = post.comments.concat({
      _id: userid,
      username: req.rootUser.firstName + " " + req.rootUser.lastName,
      text: comment,
      by: by,
    });
    await post.save();
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
  }
});
router.post("/post/removecomment", authenticate, async (req, res) => {
  try {
    const { _id, postid } = req.body;

    const post = await postModel.findOne({ _id: postid });
    const index = post.comments.findIndex((obj) => obj._id === _id);
    post.comments.splice(index, 1);

    await post.save();
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
  }
});

router.post("/auth/register", async (req, res) => {
  const { firstName, lastName, userName, email, age, contactNumber, password } =
    req.body;
  var userDetails = new userModel({
    firstName,
    lastName,
    userName,
    email,
    age,
    contactNumber,
    password,
  });
  try {
    let emailExists = await userModel.findOne({ email: email });
    if (!emailExists) {
      await userDetails.save();

      res.status(200).json({ message: "done" });
      console.log("successs");
    } else {
      console.log("email already exists");
      res.status(409).json({ message: "user already exists" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/allsubs/post", authenticate, async (req, res) => {
  try {
    const user = req.rootUser;
    const { text, subname } = req.body;
    const sub = await subModel.findOne({ name: subname });
    const bannedWords = sub.banned.map((obj) => obj["word"]);

    const regex = new RegExp("\\b(" + bannedWords.join("|") + ")\\b", "gi");
    const result = text.replace(regex, (match) => "*".repeat(match.length));
    console.log(result);

    const postDetails = new postModel({
      text: result,
      by: user._id,
      in: sub._id,
    });
    await postDetails.save();

    sub.posts.push({ _id: postDetails._id });
    await sub.save();

    res.status(200).json({ message: "posted successfully" });
  } catch (err) {
    console.log(err);
  }
});

router.post("/auth/login", async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    console.log(req.body);
    const userdata = await userModel.findOne({ email: email });
    if (userdata) {
    }

    if (userdata) {
      console.log(userdata);
      const isValid = await bcrypt.compare(password, userdata.password);
      console.log(isValid);
      if (!isValid) {
        res.status(400).json({ message: "invalid credentials" });
      } else {
        const token = await userdata.generateJwt();
        console.log(token);
        res.cookie("jwtoken", token, {
          httpOnly: true,
          maxAge: 2628000000,
        });
        console.log(`${userdata.userName} logged in successfully`);
        res.status(200).send();
      }
    } else {
      console.log("user not found");
      res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/follow/remove", async (req, res) => {
  try {
    const { followeremail, useremail } = req.body;
    console.log(req.body);
    const userdata = await userModel.findOne({ email: useremail });
    if (!userdata) {
      res.status(400).json({ error: "userdata null" });
    }
    const followerdata = await userModel.findOne({ email: followeremail });
    if (!followerdata) {
      res.status(400).json({ error: "followerdata null" });
    }
    userdata.followers.splice(
      userdata.followers.findIndex((e) => e.email === followeremail)
    );
    await userdata.save();
    followerdata.following.splice(
      followerdata.following.findIndex((e) => e.email === useremail)
    );
    await followerdata.save();
    res.status(200).json({ message: "follow removed successfully" });
    console.log("follow removed successfully");
  } catch (err) {
    console.log(err);
  }
});

router.post("/unfollow", async (req, res) => {
  try {
    const { followeremail, useremail } = req.body;
    const userdata = await userModel.findOne({ email: useremail });
    const following = await userModel.findOne({ email: followeremail });
    userdata.following.splice(
      userdata.following.findIndex((e) => e.email === followeremail)
    );
    await userdata.save();
    following.followers.splice(
      following.followers.findIndex((e) => e.email === useremail)
    );
    await following.save();
    res.status(204).json({ message: "unfollow success" });
  } catch (err) {
    console.log(err);
  }
});

router.post("/follow/add", async (req, res) => {
  try {
    const { followeremail, useremail } = req.body;
    console.log(req.body);
    const userdata = await userModel.findOne({ email: useremail });
    const followerdata = await userModel.findOne({ email: followeremail });
    if (!userdata) {
      res.status(400).json({ message: "userdata null" });
    }
    if (!followerdata) {
      res.status(400).json({ message: "followerdata null" });
    }
    if (!userdata.followers) {
      console.log("userdata.followers null");
      userdata.followers = [];
    }
    if (!followerdata.following) {
      followerdata.following = [];
    }
    userdata.followers = userdata.followers.concat({
      email: followerdata.email,
      name: followerdata.firstName + " " + followerdata.lastName,
    });
    const ret = await userdata.save();
    // console.log(ret)
    followerdata.following = followerdata.following.concat({
      email: userdata.email,
      name: userdata.firstName + " " + userdata.lastName,
    });
    await followerdata.save();
    res.status(200).json({ message: "successfully added follower" });
  } catch (err) {
    console.log(err);
  }
});

router.post("/createsub", async (req, res) => {
  try {
    var { name, desc, tags, banned, user } = req.body;
    const users = [
      {
        _id: user._id,
        name: user.firstName + " " + user.lastName,
      },
    ];

    if (!name || !desc) {
      res.status(400).json({ error: "incomplete info" });
    }

    tags = tags.split(" ");
    var tagsdict = [];
    var banneddict = [];
    for (let i = 0; i < tags.length; i++) {
      tagsdict.push({ tag: tags[i] });
    }

    tags = tagsdict;
    banned = banned.split(" ");
    for (let i = 0; i < banned.length; i++) {
      banneddict.push({ word: banned[i] });
    }
    banned = banneddict;

    var subdetails = new subModel({
      name,
      desc,
      tags,
      banned,
      users,
    });
    const sub = await subdetails.save();
    const retuser = await userModel.findOne({ _id: user._id });

    if (!retuser.mysubs) retuser.mysubs = [];

    retuser.mysubs = retuser.mysubs.concat({ _id: sub._id });
    await retuser.save();

    res.status(200).json({ message: "sub successfully registered" });
    console.log("successfull registeratuion");
  } catch (err) {
    console.log(err);
  }
});

router.post("/follow", authenticate, async (req, res) => {
  try {
    const user = req.rootUser;
    const { _id } = req.body;
    console.log(_id);
    const follower = await userModel.findOne({ _id });
    console.log(follower);
    follower.followers = follower.followers.concat({
      _id: user._id,
      email: user.email,
      name: user.firstName + " " + user.lastName,
    });
    user.following = user.following.concat({
      _id,
      email: follower.email,
      name: follower.firstName + " " + follower.lastName,
    });
    await user.save();
    await follower.save();
    res.status(200).json({ message: "following successful" });
  } catch (err) {
    console.log(err);
  }
});

router.put("/:id/delete", (req, res) => {
  const itemId = req.params.id;
  const objectIndex = req.body.index;

  subModel
    .findByIdAndUpdate(itemId, { $pull: { requests: { _id: objectIndex } } })
    .then(() => res.json({ success: true }))
    .catch((err) => res.status(404).json({ success: false }));
});

router.put("/:id/add", (req, res) => {
  const itemId = req.params.id;
  const objectIndex = req.body.Object;
  objectIndex.isBlocked = false;

  subModel
    .findByIdAndUpdate(itemId, {
      $push: { users: objectIndex },
      $pull: { requests: { _id: objectIndex._id } },
    })
    .then(() => res.json({ success: true }))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
