var mongoose = require("mongoose");

var KeySchema = new mongoose.Schema({
  ref: Number,
  target: Number,
  category: String,
  scat: String,
  free_text: {
    type: Boolean,
    default: false
  }, // free text limited at max_lenght chars
  multi_choices: { type: Boolean, default: false}, // closed choices, several possible
  single_choice:{ type: Boolean, default: false}, // closed choices, only one possible
  freq: Number, // Frequency until reappearance
  mlen: Number, // if free_text
  exp: Number, // minutes
  points: Number, // points to win
  logical_link:	{type: Boolean, default: false}, // if answer provoke
  selectors_refs:	[Number], // if logical_link, contains next key for each answer. If only one sequel is possible then []
  sequel_ref: Number, // if key"s followed by another, here"s its ref, 0 if not
  content: [{
    lang: String,
    question: String,
    summary: String,
    placeholder: String,
    selectors: [String],
    tags: [String]
  }]
});

KeySchema.methods.toJSON = function() {
  var obj = this.toObject();

  delete obj.scat;
  delete obj.freq;
  delete obj.mlen;
  delete obj.exp;
  delete obj._id;

  return obj
}

module.exports = mongoose.model("Key", KeySchema);
