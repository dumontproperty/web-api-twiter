var mongoose = require("mongoose");
var modelNames = require("../models/names/model").names;


//innerview models
var userModel  = require("../models/users");
var innerviewUserModel  = require("../models/innerviewUser");


exports.getModel = function (modelName) {
    if (modelName === null) {
         return null;
     }
      if(modelName === modelNames.USER){
          return userModel;
      }else if(modelNames.INNERVIEW_USER){
          return  innerviewUserModel;
      }

    return  mongoose.model(modelName);
};
