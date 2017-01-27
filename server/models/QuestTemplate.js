var mongoose = require("mongoose");

/*
** Quest template statuses :
** 1 - free
** 2 - paying
** 3 - under construction
** 4 - VIP
*/

var QuestTemplateSchema = new mongoose.Schema({
  ref: Number,
  status: Number,
  info: [{
    lang: String,
    name: String,
    text: String
  }],
  keys: [{
    key_ref: Number,
    position: Number,
    is_gold: Boolean,
    milestone: Number
  }],
  companion_keys:	[{
    ref: Number,
    milestone: Number
  }]
});

module.exports = mongoose.model("QuestTemplate", QuestTemplateSchema);
