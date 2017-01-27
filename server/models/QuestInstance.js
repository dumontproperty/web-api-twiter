var mongoose = require("mongoose");

var QuestInstanceSchema = new mongoose.Schema({
  name: String,
  description: String,
  mood: Number,
  ref_quest_template: Number,
  id_user: {type: mongoose.Schema.Types.ObjectId, index: true},
  companions: [{
    id: mongoose.Schema.Types.ObjectId,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  keys: [{ type: mongoose.Schema.Types.ObjectId, ref: "QuestKey" }], // QuestKey ids
  current_milestone: Number,
  done: Boolean,
  archived: Boolean,
  template_id: mongoose.Schema.Types.ObjectId,
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("QuestInstance", QuestInstanceSchema);
