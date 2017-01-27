var mongoose = require("mongoose");

var PendingRegistrationSchema = new mongoose.Schema({
  email: String,
  code: String,
  confirmed: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("PendingRegistration", PendingRegistrationSchema);
