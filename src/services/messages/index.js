const express = require("express");
const convoSchema = require("./schema");
const convoRouter = express.Router();
const mongoose = require("mongoose");
const { authorize } = require("../auth/middleware");

convoRouter.post("/sendMsg", authorize, async (req, res, next) => {
  try {
    console.log(req.body.to);
    const checkConvo = await convoSchema.getOldConversation(
      req.user.name,
      req.body.to
    );

    if (checkConvo === "no such convo") {
      const convo = new convoSchema(req.body);
      await convo.save();
      await convoSchema.findByIdAndUpdate(
        mongoose.Types.ObjectId(convo._id),
        {
          $push: { messages: req.body },
        },
        {
          new: true,
        }
      );
      await convoSchema.findByIdAndUpdate(
        mongoose.Types.ObjectId(convo._id),
        {
          $push: { participants: req.body.from },
        },
        {
          new: true,
        }
      );
      await convoSchema.findByIdAndUpdate(
        mongoose.Types.ObjectId(convo._id),
        {
          $push: { participants: req.body.to },
        },
        {
          new: true,
        }
      );
      res.send(convo._id);
      console.log("-----Convo created------");
    } else {
      console.log(checkConvo);
      const convo = await convoSchema.findByIdAndUpdate(
        mongoose.Types.ObjectId(checkConvo._id),
        {
          $push: { messages: req.body },
        },
        {
          new: true,
        }
      );
      convo.save();
      res.send(convo);
      console.log("-----Convo created------");
    }
  } catch (error) {
    next(error);
  }
});
convoRouter.post("/getConvo", authorize, async (req, res, next) => {
  try {
    console.log(req.user.name, req.body.to);
    const convo = await convoSchema.getOldConversation(
      req.user.name,
      req.body.to
    );
    console.log(convo);
    if (convo === "no such convo") {
      const convo = new convoSchema(req.body);
      await convo.save();
      await convoSchema.findByIdAndUpdate(
        mongoose.Types.ObjectId(convo._id),
        {
          $push: { messages: req.body },
        },
        {
          new: true,
        }
      );
      await convoSchema.findByIdAndUpdate(
        mongoose.Types.ObjectId(convo._id),
        {
          $push: { participants: req.body.from },
        },
        {
          new: true,
        }
      );
      await convoSchema.findByIdAndUpdate(
        mongoose.Types.ObjectId(convo._id),
        {
          $push: { participants: req.body.to },
        },
        {
          new: true,
        }
      );
      res.send(convo);
      console.log("-----Convo created------");
    } else {
      res.send(convo);
      console.log("-----Convo sent------");
    }
  } catch (error) {
    next(error);
  }
});

module.exports = convoRouter;
