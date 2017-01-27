var mongoose = require("mongoose");

var PrepaidTableSchema = new mongoose.Schema({
  domain: String,
	company: String,
	quests: [Number],
	emails: {
    type: [String],
    default: []
  }
});

module.exports = mongoose.model("PrepaidTable", PrepaidTableSchema);
