const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  messageFrom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  messsageTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  created_at: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
    default: false,
  },
  content: {
    type: String,
    required: true,
  },
});

const Message = mongoose.model("Message", schema);
exports.Message = Message;
