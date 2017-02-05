var mongoose = require("mongoose");

var modelNames = require("../models/names/model").names;

//mongoose modelManager
var modelManager = require("./models");

//passwor encryption manager
var passwordManager = require("./password");

var databaseConfig = require("../config/variable").database.getConfig();

//connecting to the mongo db
const databaseURL = "mongodb://" + databaseConfig.host + ":" + databaseConfig.port + "/" + databaseConfig.name;

mongoose.connect(databaseURL);

var db = mongoose.connection;

db.on("error", function(){
  console.error("error to connect to "+ databaseConfig.name + " datadase");
});

db.once("open", function () {
    console.log("connected to "+databaseConfig.name);
});

//database elements requests
var databaseManager = {
    //create an element
    createElement: function (element, modelName, result) {
        var elementModel = modelManager.getModel(modelName);

        if (elementModel !== null) {
            var elementDocument = new elementModel(element);

            //check if thre is an existing document in the collection
            elementDocument.exist(element, function (err, isElementExist) {
                if (err) {
                    return result(err, "error finding element");
                }

                if (!isElementExist) {
                        elementDocument.save(function (err, element) {
                            if (err)
                                return result(true, err);
                            return result(false, "element created", element);
                        });

                } else {
                    return result(true, "element already exsist !");
                }

            });

        } else {
            return result(true, "elementModel not exist !");
        }

    },
    //create several elements
    createElements: function (index, elements, modelName, addedElements, result) {
        var _this = this;
        if (index < elements.length) {
            _this.createElement(elements[index], modelName, function (isErr, msg, newElements) {
                if (!isErr) {
                    addedElements.push(newElements);
                } else {
                    return result(isErr, msg);
                }
                index++;
                _this.createElements(index, elements, addedElements, result);
            });
        } else {
            result(false, "elements added !", addedElements);
        }

    },
    //find an element
    findElements: function (modelName, result) {
        var elementModel = modelManager.getModel(modelName);
        if (elementModel !== null) {
            elementModel.find(function (err, elements) {
                if (err)
                    return result(true, err, {});
                return result(false, "", elements);
            });
        } else {
            return result(true, "elementModel = null");
        }

    },
    //update an element
    updateElement: function (element, result) {
        var elementModel = modelManager.getModel(element.elementModel);
        if (elementModel !== null) {
            var elementDocument = new elementModel(element);
            elementDocument.updateElement(element, result);
        } else {
            return result(true, "elementModel = null");
        }

    },
    //remove an element
    removeElement: function (element, result) {
        var elementModel = modelManager.getModel(element.elementModel);
        if (elementModel !== null) {
            elementModel.findOneAndRemove({nom: element.nom}, function (err, element) {
                if (err)
                    return result(true, err);
                return result(false, "element deleted", element);
            });
        } else {
            return result(true, "elementModel = null");
        }

    },
    //search an element by it"s name
    searchElement: function (_elementModel, _nom, result) {
        var nom = "/^" + _nom + "/";
        var elementModel = modelManager.getModel(_elementModel);
        if (elementModel !== null) {
            elementModel.find({nom: {$in: [_nom]}}, function (err, elements) {
                console.log("elements = " + JSON.stringify(elements));
                if (err)
                    return result(true, err);
                return result(false, "", elements);
            });
        } else {
            return result(true, "elementModel = null");
        }

    },
    //check user account
    checkUserAccount: function (userRaw, result) {
        var invalidUser = true;
        var elementModel = modelManager.getModel(modelNames.INNERVIEW_USER);
        if (elementModel !== null && userRaw.email !== undefined) {
            var elementDocument = new elementModel(userRaw);
            elementDocument.exist(userRaw, function (err, isElementExist, user) {
                if (err) {
                    return result(invalidUser, "error finding user");
                }

                if (!isElementExist) {
                    return result(invalidUser, "user not exist");
                }

                //check the hash user password
                passwordManager.cryptPassword(userRaw.password, function (err, hash) {

                    if (err || !hash || (hash !== user.password)) {
                        return result(invalidUser, "invalid password", user);
                    }

                    return result(!invalidUser, "user checked", user);
                });
            });

        } else {
            return result(invalidUser, "elementModel = null", null);
        }

    },
    //findOne element
    findElementById: function (element, result) {
        var isError = true;
        var elementModel = modelManager.getModel(element.elementModel);
        if (elementModel !== null) {
            elementModel.findOne({_id: element._id}, function (err, element) {
                if (err)
                    return result(isError, err);
                return result(!isError,element);
            });
        } else {
            return result(true, "elementModel = null");
        }
    }
};


module.exports = databaseManager;
