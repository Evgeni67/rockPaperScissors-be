const { Schema, model } = require("mongoose");

const convoSchema = new Schema({
  participants: [],
  messages: [],
});
convoSchema.statics.getOldConversation = async function (from, to) {
  const conversation = await this.findOne({ participants: { $all: [from, to] } });
  console.log(conversation)
  if((conversation) !== null) {


    return conversation;
  } else {
    console.log("no such convo")
    return"no such convo";
  }
};
module.exports = model("Message", convoSchema);
