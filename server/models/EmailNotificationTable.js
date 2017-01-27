var mongoose = require("mongoose");

// [freq] 0: /, 1 : 5 minutes, 2: 1hour, 3: 8hours, 4: daily (default), 5: 3 days, 6: weekly

var EmailNotificationTableSchema = new mongoose.Schema({
  user_id: mongoose.Schema.Types.ObjectId,
	freq: Number,
	lastDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("EmailNotificationTable", EmailNotificationTableSchema);
