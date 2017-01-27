var mailSender = require("./mailSender");

//passwor encryption manager
var passwordManager = require("./passwordManager");

var databaseManager = require("./databaseManager");

var elementModels = require("./elementModels");

var modelNames = require("./models/modelNames").names;

var jwt = require("jwt-simple");

var moment = require("moment");

var config = require("./config");

var TOKEN_SECRET = config.JWT.secretWord;

var REQUEST_SUCCESS = "1";

var REQUEST_ERROR = "0";


exports.findElementById = databaseManager.findElementById;

exports.init = function (app) {
    
    //find a element
    app.get("/getElement/:modelName/:id", function (req, res) {
        var errorGettingElement = true;

        var element = {
            _id: req.params.id,
            modelName: req.params.modelName
        };

        databaseManager.findElementById(element, function (err, element) {
            if (err) {
                return sendResponce(errorGettingElement, "error finding element", res);
            }
            return sendResponce(!errorGettingElement, element, res);
        });
    });


    //find all elements
    app.get("/getElements/:modelName", function (req, res) {
        var errorGettingElements = true;
        var modelName = req.params.modelName;
        databaseManager.findElements(modelName, function (isErr, msg, elements) {
            if (isErr) {
                return sendResponce(errorGettingElements, msg, res);
            }
            return sendResponce(!errorGettingElements, elements, res);
        });
    });

    //create an element
    app.post("/createElement/:modelName", function (req, res) {
        var errorCreateElement = true;
        var modelName = req.params.modelName;
        databaseManager.createElement(req.body, modelName, function (isErr, msg, element) {
            if (isErr) {
                return sendResponce(errorCreateElement, msg, res);
            }
            return sendResponce(!errorCreateElement, element, res);
        });
    });

    //create several elements
    app.post("/createElements/:modelName", function (req, res) {
        var modelName = req.params.modelName;
        var addedElements = [];
        var index = 0;
        var errorCreatingElements = true;

        databaseManager.createElements(index, req.body, modelName, addedElements, function (isErr, msg, elements) {
            if (isErr) {
                return sendResponce(errorCreatingElements, msg, res);
            }
            return sendResponce(!errorCreatingElements, elements, res);
        });
    });

    //update an element
    app.post("/updateElement", function (req, res) {
        var errorUpdatingElement = true;
        databaseManager.updateElement(req.body, function (isErr, msg, element) {
            if (isErr) {
                return sendResponce(errorUpdatingElement, msg, res);
            }
            return sendResponce(!errorUpdatingElement, element, res);
        });
    });

    //delete an elements
    app.post("/deleteElement", function (req, res) {
        var errorDeletingElement = true;
        databaseManager.removeElement(req.body, function (isErr, msg, element) {
            if (isErr) {
                return sendResponce(errorDeletingElement, msg, res);
            }
            return sendResponce(!errorDeletingElement, element, res);
        });
    });



    //authanticate a innerview user
    app.post("/auth/login", function (req, res) {
        var failToConnect = true;
        databaseManager.checkUserAccount(req.body, function (err, msg, userAccount) {
            if (err) {
                console.log("ERROR: " + msg);
                return sendResponce(failToConnect, msg, res);
            }
            
            //the token attribute need to exist for the success autentication with satellizer module in the client side
            console.log("SUCCESS: " + "autentication successful");
            var responce = {
                token: createJWT(userAccount),
                status: REQUEST_SUCCESS,
                message: "autentication successful"
            };
            
            return res.status(200).send(JSON.stringify(responce));
        });
    });

    //create a new user account
    app.post("/auth/signup", function (req, res) {
        var failedToSignUp = true;
        var newUserAccount = req.body;
        var clearPassword = newUserAccount.password;
        // hash the passwor and put email in lowerCase          
        passwordManager.cryptPassword(newUserAccount.password, function (err, hash) {
            if (err || !hash) {
                return sendResponce(failedToSignUp, "error hash password", res);
            }

            newUserAccount.password = hash;
            newUserAccount.email = newUserAccount.email.toLowerCase();

            databaseManager.createElement(newUserAccount, modelNames.INNERVIEW_USER, function (isErr, msg, user) {
                if (isErr) {
                    return sendResponce(failedToSignUp, msg, res);
                }
                user.clearPassword = clearPassword;
                //send the welcome email to the new innership user
                mailSender.welcomeEmail(user, function (isErr, message) {
                    if (isErr) {
                        return console.log("ERROR: sending welcome email");
                    }
                    return console.log("SUCCESS: welcome email succefully send");
                });

                return sendResponce(!failedToSignUp, "account created", res);
            });
        });
    });

    //change the user password
    app.post("/changePassword", function (req, res) {
        var userPassword = req.body;
        var failChangePassword = true;
        var elementModel = elementModels.getModel(modelNames.INNERVIEW_USER);
        var elementDocument = new elementModel(userPassword);

        elementDocument.exist(userPassword, function (err, isElementExist, user) {
            if (err) {
                return sendResponce(failChangePassword, "error searching user", res);
            }

            if (!isElementExist) {
                return sendResponce(failChangePassword, "user not exist", res);
            }

            // hash the hold passwor       
            passwordManager.cryptPassword(userPassword.holdPassword, function (err, hodPasswordHash) {
                if (err || !hodPasswordHash) {
                    return sendResponce(failChangePassword, "error hash hold password", res);
                }

                if (user.password !== hodPasswordHash) {
                    return sendResponce(failChangePassword, "invalid hold password", res);
                }

                // hash the new passwor       
                passwordManager.cryptPassword(userPassword.newPassword, function (err, newPasswordHash) {
                    if (err || !newPasswordHash) {
                        return sendResponce(failChangePassword, "error hash new password", res);
                    }

                    user.password = newPasswordHash;
                    user.save();

                    return sendResponce(!failChangePassword, "password successfully changed", res);
                });
            });
        });
    });

    //reset the user password
    app.post("/resetPassword", function (req, res) {
        var failResetPassword = true;
        var userPassword = req.body;
        userPassword.elementModel = modelNames.INNERVIEW_USER;

        databaseManager.findElementById(userPassword, function (err, user) {

            if (err) {
                return sendResponce(failResetPassword, "error finding user", res);
            }

            if (user === null) {
                return sendResponce(failResetPassword, "user not exist", res);
            }

            // hash the new password       
            passwordManager.cryptPassword(userPassword.newPassword, function (err, newPasswordHash) {
                if (err || !newPasswordHash) {
                    return sendResponce(failResetPassword, "error hash new password", res);
                }

                user.password = newPasswordHash;
                user.save();

                return sendResponce(!failResetPassword, "password successfully reset", res);
            });
        });
    });

    //send the reset email to the user
    app.post("/sendResetEmail", function (req, res) {
        var userRaw = req.body;
        var failSendResetEmail = true;

        var elementModel = elementModels.getModel(modelNames.INNERVIEW_USER);
        var elementDocument = new elementModel(userRaw);

        elementDocument.exist(userRaw, function (err, isElementExist, user) {
            if (err) {
                return sendResponce(failSendResetEmail, "error finding user", res);
            }

            if (!isElementExist) {
                return sendResponce(failSendResetEmail, "user not exist", res);
            }
            //send the reset password email
            mailSender.resetPasswordEmail(user, function (isErr, message) {
                if (isErr) {
                    return sendResponce(failSendResetEmail, "error sending password reset email", res);
                }
                return sendResponce(!failSendResetEmail, "password reset email succefully send", res);
            });
        });
    });
};


function createJWT(user) {
    var validityPeriod = 1;
    var timeIndicator = "days";
    var payload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        iat: moment().unix(),
        exp: moment().add(validityPeriod , timeIndicator).unix()
    };
    return jwt.encode(payload, TOKEN_SECRET);
}


//send the JSON response to de client side
function sendResponce(isErr, message, res) {

    var responce = {
        status: REQUEST_SUCCESS,
        message: message
    };

    if (isErr) {
        responce.status = REQUEST_ERROR;
        console.log("ERROR: " + responce.message);
    } else {
        console.log("SUCCESS: " + responce.message);
    }

    return res.status(200).send(JSON.stringify(responce));
}







