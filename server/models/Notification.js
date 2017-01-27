var mongoose = require("mongoose");

var NotificationSchema = new mongoose.Schema({
  quest_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "QuestInstance"
  },
  quest_key_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "QuestKey"
  },
  comment_index: Number,
  username: String,
  email: String,
  type: Number,
  text: String,
  viewed: Boolean,
  created_at: {
    type: Date,
    default: Date.now,
    index: true
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Notification", NotificationSchema);
