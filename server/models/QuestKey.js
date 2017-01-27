var mongoose = require("mongoose");

var QuestKeySchema = new mongoose.Schema({
  target: Number,
  companion: mongoose.Schema.Types.ObjectId,
  quest_id: mongoose.Schema.Types.ObjectId,
  key_ref: {type: Number, index: true},
  milestone: Number,
  position: Number,
  active: Boolean,
  answer: {
    uniqueChoice: String,
    choices: [String],
    freeText: String,
    date: Date
  },
  is_gold: Boolean,
  timer_start: Boolean,
  comments:	[{
    date: Date,
    author: String,
    author_username: String,
    content_type: Number,
    text: String,
    helpful: Boolean,
    index: Number
  }],
  firstAnswerDate: Date
});

QuestKeySchema.methods.toJSON = function() {
  var obj = this.toObject();

  delete obj.companion;
  delete obj.quest_id;
  delete obj.__v;
  return obj
}

QuestKeySchema.pre("save", function (next) {
  if (this.isNew && 0 === this.answer.choices.length && undefined == this.answer.uniqueChoice && undefined == this.answer.freeText) {
    this.answer = null;
  }
  next();
});

module.exports = mongoose.model("QuestKey", QuestKeySchema);
