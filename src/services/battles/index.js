const express = require("express");
const BattleModel = require("./schema");
const battlesRouter = express.Router();
const { authorize } = require("../auth/middleware");
const mongoose = require("mongoose");
battlesRouter.post("/startBattle", authorize, async (req, res, next) => {
  try {
    console.log("starting battle...");
    req.body.player2 = req.user.name;
    const newBattle = new BattleModel(req.body);
    newBattle.save();
    res.send(newBattle._id);
  } catch (error) {
    next(error);
  }
});
battlesRouter.get("/getBattle", authorize, async (req, res, next) => {
  try {
    console.log(req.user.name);
    const battles = await BattleModel.find({
      $or: [{ player1: req.user.name }, { player2: req.user.name }],
    });
    const currentBattle = battles.filter(
      (battle) => battle.isFinished === false
    )[0];
    console.log(battles);

    res.send(currentBattle);
  } catch (error) {
    next(error);
  }
});
battlesRouter.get("/getResult/:id", async (req, res, next) => {
  try {
    console.log("req.user.name");
    console.log("collecting data...");
    const gameToFinish = await BattleModel.findById(
      mongoose.Types.ObjectId(req.params.id)
    );
    console.log(gameToFinish);
    const player1Card = gameToFinish.player1Card;
    const player2Card = gameToFinish.player2Card;
    console.log("player1Card ->", player1Card);
    console.log("player2Card ->", player2Card);
    //update required
    if (player1Card === "R" && player2Card === "S") {
      res.send({
        whoWins: "player1Wins",
        player1Card: player1Card,
        player2Card: player2Card,
      });
    } else if (player1Card === "R" && player2Card === "P") {
      res.send({
        whoWins: "player2Wins",
        player1Card: player1Card,
        player2Card: player2Card,
      });
      return;
    } else if (player1Card === "S" && player2Card === "P") {
      res.send({
        whoWins: "player1Wins",
        player1Card: player1Card,
        player2Card: player2Card,
      });
      return;
    } else if (player1Card === "P" && player2Card === "R") {
      res.send({
        whoWins: "player1Wins",
        player1Card: player1Card,
        player2Card: player2Card,
      });
      return;
    } else if (player1Card === "P" && player2Card === "S") {
      res.send({
        whoWins: "player2Wins",
        player1Card: player1Card,
        player2Card: player2Card,
      });
      return;
    } else if (player1Card === "S" && player2Card === "R") {
      res.send({
        whoWins: "player2Wins",
        player1Card: player1Card,
        player2Card: player2Card,
      });
      return;
    } else {
      res.send({
        whoWins: "tie",
        player1Card: player1Card,
        player2Card: player2Card,
      });
    }
  } catch (error) {
    next(error);
  }
});
battlesRouter.post("/addCard/:id", authorize, async (req, res, next) => {
  try {
    console.log(req.body.isPlayer1);

    if (req.body.isPlayer1) {
      const updatedBattle = await BattleModel.findByIdAndUpdate(
        mongoose.Types.ObjectId(req.params.id),
        {
          player1Card: req.body.playerCard,
        },
        {
          new: true,
        }
      );
      console.log(updatedBattle);

      res.send(updatedBattle);
    } else {
      const updatedBattle = await BattleModel.findByIdAndUpdate(
        mongoose.Types.ObjectId(req.params.id),
        {
          player2Card: req.body.playerCard,
        },
        {
          new: true,
        }
      );
      console.log(updatedBattle);

      res.send(updatedBattle);
    }
  } catch (error) {
    next(error);
  }
});
battlesRouter.get("/getResult/:id", async (req, res, next) => {
  console.log("collecting data...");
  try {
  } catch (error) {
    next(error);
  }
});

module.exports = battlesRouter;
