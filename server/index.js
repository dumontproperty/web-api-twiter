var express = require("express");

var bodyParser = require("body-parser");

var roots = require("./roots");

var config = require("./config");

var jwt = require("jwt-simple");

var databaseManager = require("./databaseManager");

var app = express();

var passwordManager = require("./passwordManager");

//express configuration
var serverConfig = config.server.getConfig();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

app.use(require("cookie-parser")());

app.use(require("body-parser").urlencoded({extended: true}));

app.use(require("express-session")({secret: "keyboard cat", resave: true, saveUninitialized: true}));

var allowOriginPort = serverConfig.port;


//check if user allowed to access the server routes
app.use(function (req, res, next) {
    //get the request URL path
    var URLPath = req.path;

    //get the user JWT
    var userJWT = req.get("Authorization");

    //enable this route for user authentication
    if (URLPath === "/auth/login" || userJWT === undefined) {
        return   next();
    }

    var token = JSON.parse(userJWT).token;

    var userInfo = jwt.decode(token, config.JWT.secretWord);

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

if (!config.IS_PRODUCTION_MODE) {
    //the grunt server port
    allowOriginPort = 9000;
}

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:" + allowOriginPort);

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

app.use("/bower_components", express.static("bower_components"));
app.use("/app/styles", express.static("./app/styles"));


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
roots.init(app);
