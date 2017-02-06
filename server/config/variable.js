 var variable = {
  IS_PRODUCTION_MODE: true, //true, false

  //server variable
  server: {
    dev:{
      port: 8080,
      host: "localhost"
    },
    prod :{
      port: 8080,
      host: "localhost"
    },
    staticPaths: ["www"],
    getConfig: function() {
      var _variable = {
        port: variable.server.dev.port,
        host: variable.server.dev.host,
        staticPaths: variable.server.staticPaths
      }

      if (variable.IS_PRODUCTION_MODE) {
        _variable.port = variable.server.prod.port;
        _variable.host = variable.server.prod.host;
      }

      return _variable;
    }
  },
  //mail Sender variable
  mailSender: {
    smtpConfig: {
      host: "smtp.gmail.com",
      port: 465,
      auth: {
        user: "miguel.dumont.devoption@gmail.com",
        pass: "devoption02072015"
      },
      tls: {
        rejectUnauthorized: false
      }
    },
    getBaseURL: function() {
      if (variable.IS_PRODUCTION_MODE)
        return "http://" + variable.server.prod.host;
      return "http://" + variable.server.dev.host + variable.server.dev.port;
    }
  },
  //the atabase variable
  database: {
    name: "web-api-twitter",
    dev:{
      host:"localhost",
      port:"27017"
    },
    prod:{
      host:"@ds141209.mlab.com",
      port: "41209"
    },
    getConfig: function() {
      var _variable = {
        name: variable.database.name,
        host: variable.database.dev.host,
        port: variable.database.dev.port
      }

      if (variable.IS_PRODUCTION_MODE) {
        _variable.host = variable.database.prod.host;
        _variable.port = variable.database.prod.port;
      }

      return _variable;
    }
  },
  //the JWT user variable
  JWT: {
    secretWord: "TOKEN_SECRET"
  }
};

module.exports = variable;
