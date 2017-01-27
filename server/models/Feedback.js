var mongoose = require("mongoose");

var FeedbackSchema = new mongoose.Schema({
  comment: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    require: false
  },
  app_version: String,
  model: String,
  os_version: String,
  user_agent: String,
  created_at : {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Feedback", FeedbackSchema);
