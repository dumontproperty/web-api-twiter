var mongoose = require("mongoose");
var modelNames = require("./modelNames").names;

var InnerviewUserSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        index: true,
        unique: true,
        lowercase: true
    },
    password: String,
    role: {
        type: String,
        enum: ["admin", "collab", "client"]
    },
    deploiements: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "PrepaidTable"
        }]
});


//check if thre is a document with an existing email
InnerviewUserSchema.methods.exist = function (userRaw, result) {
    var isFounded = true;
    var isError = true;
    
    if (userRaw.email !== undefined) {
        this.model(modelNames.INNERVIEW_USER).findOne({email: userRaw.email}, function (err, user) {
                     
            if (err) {               
                return result(!isError, !isFounded);
            }

            if (user === null) {              
                return result(!isError, !isFounded);
            }
                       
            return result(!isError, isFounded, user);
        });

    } else {
        return result(isError, !isFounded);
    }
};

module.exports = mongoose.model(modelNames.INNERVIEW_USER, InnerviewUserSchema);