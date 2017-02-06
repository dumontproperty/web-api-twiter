var express = require("express");

var bodyParser = require("body-parser");

var jwt = require("jwt-simple");

var variableConfig = require("./config/variable");

var rooteManager = require("./managers/roote");

var databaseManager = require("./managers/database");

var passwordManager = require("./managers/password");

var serverConfig = variableConfig.server.getConfig();

var allowOriginPort = (!variableConfig.IS_PRODUCTION_MODE) ? 9000 : serverConfig.port;

var app = express();

//express configuration
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

app.use(require("cookie-parser")());

app.use(require("body-parser").urlencoded({extended: true}));

//app.use(require("express-session")({secret: "keyboard cat", resave: true, saveUninitialized: true}));

//check if user allowed to access the server routes
app.use(function (req, res, next) {
    //get the request URL path
    var URLPath = req.path;

    //get the user JWT
    var userJWT = req.get("Authorization");

    return next();

    //enable this route for user authentication
    if (URLPath === "/auth/login" || userJWT === undefined) {
        return next();
    }

    var token = JSON.parse(userJWT).token;

    var userInfo = jwt.decode(token, variableConfig.JWT.secretWord);

    console.log("userInfo._id = " + userInfo._id);

    //check if the user exist in the data base
    databaseManager.findElementById(userInfo, function (err, element) {
           if (err || (element === null)) {
               console.log("ERROR: user not permited !");
              return res.status(401).send(JSON.stringify({ message: "user not permited !"}));
          }
          return  next();
      });
});


app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:9000");

    // Request methods you wish to allow
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");

    // Request headers you wish to allow
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, content-type, Authorization");

    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});


serverConfig.staticPaths.forEach(function(staticPath){
  app.use(express.static(staticPath));
});


//set the port to litening
app.listen(serverConfig.port, function () {
    console.log("innerView server\nlistening on " + serverConfig.host + ", port = " + serverConfig.port);
});


//create default admin user if not exist
var user = {
    name: "admin",
    email: "admin",
    password: "test",
    role: "admin",
    modelName: "InnerviewUser"
};

passwordManager.cryptPassword(user.password, function (err, hash) {
    if (err || !hash) {
        console.log("error hash password");
        return console.log("default admin not created");
    }

    user.password = hash;

    databaseManager.createElement(user,"InnerviewUser", function (err, msg, element) {
            if (err || (element === null)) {
                return console.log(msg);
            }
            return console.log("default admin created");
        });
});


//init the webservices routes
rooteManager.init(app);
