const { Schema, model } = require("mongoose");

const battleSchema = new Schema({
  player1: { type: String, required: true },
  player1Card: { type: String, required: true },
  player2: { type: String, required: true },
  player2Card: { type: String, required: true },
  isFinished: { type: Boolean, default: false },
});

battleSchema.statics.addCard = async function (id,playerCard,isPlayer1) {
 
  const battle = await this.findOne({ _id: id });
  if(isPlayer1){
    battle.player1Card = playerCard
    console.log("player1")
  }else{
    battle.player2Card = playerCard
    console.log("player2")
  }
  battle.save()
  return battle
}
battleSchema.statics.fight = async function (id,player1Card,player2Card) {
  const battle = await this.findOne({ _id: id });

  if (player1Card === "R" && player2Card === "S") {
    battle.isFinished = true
    battle.save();
    return;
  } else if (player1Card === "R" && player2Card === "P") {
    battle.isFinished = true
    battle.save();
    return;
  } else if (player1Card === "S" && player2Card === "P") {
    battle.isFinished = true
    battle.save();
    return;
  } else if (player1Card === "P" && player2Card === "R") {
    battle.isFinished = true
    battle.save();
    return;
  } else if (player1Card === "P" && player2Card === "S") {
    battle.isFinished = true
    battle.save();
    return;
  } else if (player1Card === "S" && player2Card === "R") {
    battle.isFinished = true
    battle.save();
    return;
  } else {
    return;
  }
};
module.exports = model("Battle", battleSchema);
