const { Schema, model } = require("mongoose");

const battleSchema = new Schema({
  player1:{type:String,required:true},
  player1Cards:{type:Array,required:true},
  player1Points:{type:Number,required:true},
  player2:{type:String,required:true},
  player2Cards:{type:Array,required:true},
  player2Points:{type:Number,required:true},
  rounds:{type:Number,required:true},
  currentRound:{type:Number,required:true},
});
battleSchema.statics.anyWinner = async function (id) {
    const battle = await this.findOne({_id:id});
    if(0.5 < battle.rounds/battle.player1Points){
        return "Player 1 wins"
    }else if(0.5 < battle.rounds/battle.player2Points){
        return "Player 2 wins"
    }else{
        return "Continue"
    }
  };
  battleSchema.statics.nextRound = async function (id) {
    const battle = await this.findOne({_id:id});
    battle.currentRound = battle.currentRound + 1
    battle.save()
  };
  battleSchema.statics.fight = async function (cardId) {
    const battle = await this.findOne({_id:id});
   player1Card = battle.player1Cards[cardId]
   player2Card = battle.player1Cards[cardId]

   if(player1Card === "R" && player2Card === "S"){
    battle.player1Points = battle.player1Points+1
    battle.save()
    return
   }else if(player1Card === "R" && player2Card === "P"){
   battle.player2Points = battle.player2Points+1
    battle.save()
    return
  }else if(player1Card === "S" && player2Card === "P"){
    battle.player1Points = battle.player1Points+1
     battle.save()
     return
   }else if(player1Card === "P" && player2Card === "R"){
    battle.player1Points = battle.player1Points+1
     battle.save()
     return
   }else if(player1Card === "P" && player2Card === "S"){
    battle.player2Points = battle.player2Points+1
     battle.save()
     return
   }else if(player1Card === "S" && player2Card === "R"){
    battle.player2Points = battle.player2Points+1
   battle.save()
   return
 }else{
     return
    };
}
module.exports = model("Battle", battleSchema);
