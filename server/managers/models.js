var mongoose = require("mongoose");
var modelNames = require("../models/names/model").names;


//innerview models
var userModel  = require("../models/users");
var innerviewUserModel  = require("../models/innerviewUser");
var twitModel  = require("../models/twit");


exports.getModel = function (modelName) {
    if (modelName === null) {
         return null;
     }
      if(modelName === modelNames.USER){
          return userModel;
      }else if(modelName === modelNames.INNERVIEW_USER){
          return  innerviewUserModel;
      }else if(modelName === modelNames.TWIT){
          return  twitModel;
      }


    return  mongoose.model(modelName);
};
