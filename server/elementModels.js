var mongoose = require("mongoose");
var modelNames = require("./models/modelNames").names;


//innerview models
var userModel  = require("./models/User");
var innerviewUserModel  = require("./models/innerviewUser");


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


