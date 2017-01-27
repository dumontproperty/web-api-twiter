var mongoose = require("mongoose");

var KeyViewEventSchema = new mongoose.Schema({
  quest_id:	mongoose.Schema.Types.ObjectId,
  user_id:	mongoose.Schema.Types.ObjectId,
  lastDate:	{
    type: Date,
    default: Date.now,
    index: true
  }
});

module.exports = mongoose.model("KeyViewEvent", KeyViewEventSchema);
