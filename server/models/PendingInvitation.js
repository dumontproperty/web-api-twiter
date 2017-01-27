var mongoose = require("mongoose");

var PendingInvitationSchema = new mongoose.Schema({
  invited_email: String,
  quest_id: mongoose.Schema.Types.ObjectId,
  quest_name: String,
  quest_desc: String,
  owner: String,
  owner_email: String,
  current_milestone: Number,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("PendingInvitation", PendingInvitationSchema);
