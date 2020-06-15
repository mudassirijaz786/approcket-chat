const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  created_at: {
    type: String,
    required: true,
  },
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
});

const Room = mongoose.model("Room", schema);
exports.Room = Room;
