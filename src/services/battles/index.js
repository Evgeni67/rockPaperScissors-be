const express = require("express");
const BattleModel = require("./schema");
const battlesRouter = express.Router();
const { authorize } = require("../auth/middleware");

battlesRouter.post("/inviteToBattle/:id",authorize, async (req, res, next) => {
  try {
    req.body.player1 = req.user
    const newBattle = new BattleModel(req.body);
    newBattle.save();
    res.send(newBattle._id);
  } catch (error) {
    next(error);
  }
});

module.exports = battlesRouter;
