const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const ProfileSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    online: {
      type:Boolean,
      required:true,
    },
    tokens: [
      {
        token: {
          type: String,
        },
        refreshToken: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

ProfileSchema.statics.findByCredentials = async function (email, plainPW) {
  const user = await this.findOne({ name:email });
  if (user) {
    const isMatch = await bcrypt.compare(plainPW, user.password);
    if (isMatch) return user;
    else return null;
  } else {
    return null;
  }
};
ProfileSchema.statics.getOnlineUsers = async function () {
  const users = await this.find({ online:true });
  if (users) {
  return users
  } else {
    return "no users online";
  }
};

const ChatProfileModel = model("Profiles", ProfileSchema);

module.exports = ChatProfileModel;
