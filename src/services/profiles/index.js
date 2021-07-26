const express = require("express");
const { authenticate, refreshToken, cryptPassword } = require("../auth/tools");
const ChatProfileModel = require("./schema");
const profilesRouter = express.Router();
const { authorize } = require("../auth/middleware");
const multer = require("multer");
const mongoose = require("mongoose");
const cloudinary = require("../utilities/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "samples",
  },
});
const cloudinaryMulter = multer({ storage: storage });
profilesRouter.post("/register", async (req, res, next) => {
  try {
    const password = await cryptPassword(req.body.password);
    req.body["password"] = password;
    const newUser = new ChatProfileModel(req.body);
    newUser.save();
    res.send(newUser._id);
  } catch (error) {
    next(error);
  }
});
profilesRouter.post(
  "/addProfilePic/:id",
  cloudinaryMulter.single("postPic"),
  async (req, res, next) => {
    try {
      const user = await ChatProfileModel.findByIdAndUpdate(
        mongoose.Types.ObjectId(req.params.id),
        {
          $set: { profilePic: req.file.path },
        },
        { new: true }
      );
      console.log("updating pic...", user);
      user.save();
      res.send(req.file.path);
    } catch (error) {
      next(error);
    }
  }
);
profilesRouter.post("/login", async (req, res, next) => {
  try {
    const { name, password } = req.body;
    const user = await ChatProfileModel.findByCredentials(name, password, {
      new: true,
    });
    user.online = true;
    user.save();
    const tokens = await authenticate(user);
    res.send([tokens, user]);
  } catch (error) {
    next(error);
  }
});
profilesRouter.post("/logOut", authorize, async (req, res, next) => {
  try {
    const user = await ChatProfileModel.findOne({ name: req.user.name });
    user.online = false;
    user.save();
    res.send("logged out");
  } catch (error) {
    next(error);
  }
});
profilesRouter.post("/getMe", authorize, async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (error) {
    next(error);
  }
});
profilesRouter.get("/getProfilePic/:name", authorize, async (req, res, next) => {
  try {console.log("user -> ")
    const user = await ChatProfileModel.findOne({ name: req.params.name });
    console.log("user -> ",user)
    res.send(user.profilePic);
  } catch (error) {
    next(error);
  }
});
profilesRouter.get("/getOnlineProfiles", async (req, res, next) => {
  try {
    const users = await ChatProfileModel.getOnlineUsers({
      new: true,
    });
    res.send(users);
  } catch (error) {
    next(error);
  }
});
module.exports = profilesRouter;
