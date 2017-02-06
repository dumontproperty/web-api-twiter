var mongoose = require("mongoose");
var modelNames = require("./names/model").names;

var UserSchema = new mongoose.Schema({
  username: String,
  email: {type: String, index: true, unique: true},
  password: String,
  langage: String,
  avatar: String,
  prepaid: {
    type: String,
    id: String
  },
  badges: [mongoose.Schema.Types.ObjectId],
  owned_quests:	[{
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "QuestInstance"
      //unique: true      : This doesn"t work to ensure uniqueness in an array
    }
  }],
  following_quests:	[{
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "QuestInstance"
      //unique: true      : This doesn"t work to ensure uniqueness in an array
    },
    influence_points: {
      type: Number,
      default: 0
    }
  }],
  influence_points: Number,
  last_ip: String,
  connection_nb: Number,
  user_agent: {
    ua: String,
    device: String,
    appVersion: String
  },
  updated_at: { type: Date, default: Date.now },
  registration_date: { type: Date, default: Date.now },
  last_connection_date:	{ type: Date, default: Date.now },
  devices: [String],
  push: {type: Number, default: 3},
  new_notifs_nb: {type: Number, default: 0}
});

UserSchema.methods.toJSON = function() {
  var obj = this.toObject();

  delete obj.avatar;
  delete obj.prepaid;
  delete obj.badges;
  delete obj.last_ip;
  delete obj.connection_nb;
  delete obj.user_agent;
  delete obj.updated_at;
  delete obj.registration_date;
  delete obj.last_connection_date;
  delete obj.password;
  delete obj.new_notifs_nb;

  return obj;
};

//check if thre is a document with an existing email
UserSchema.methods.exist = function (userRaw, result) {
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

            return result(!isError, isFounded);
        });

    } else {
        return result(isError, !isFounded);
    }
};



module.exports = mongoose.model(modelNames.USER, UserSchema);
