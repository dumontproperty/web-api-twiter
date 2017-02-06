var mongoose = require("mongoose");
var modelNames = require("./names/model").names;

var TwitSchema = new mongoose.Schema({
    screenName: String,
    location: String,
    createdAt: String
});


TwitSchema.methods.exist = function (twit, result) {
    var isFounded = true;
    var isError = true;

    if (twit.screenName !== undefined) {
        this.model(modelNames.TWIT).findOne({email: twit.screenName}, function (err, user) {
            if (err) return result(!isError, !isFounded);

            if (user === null) return result(!isError, !isFounded);

            return result(!isError, isFounded, user);
        });

    } else {
        return result(isError, !isFounded);
    }
};

module.exports = mongoose.model(modelNames.TWIT, TwitSchema);
