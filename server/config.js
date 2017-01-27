var config = {
  IS_PRODUCTION_MODE: false, //true, false

  //server config
  server: {
    dev:{
      port: 3000,
      host: "localhost"
    },
    prod :{
      port: 80,
      host: "localhost"
    },
    staticPaths: ["www"],
    getConfig: function() {
      var _config = {
        port: config.server.dev.port,
        host: config.server.dev.host,
        staticPaths: config.server.staticPaths
      }

      if (config.IS_PRODUCTION_MODE) {
        _config.port = config.server.prod.port;
        _config.host = config.server.prod.host;
      }

      return _config;
    }
  },
  //mail Sender config
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
      if (config.IS_PRODUCTION_MODE)
        return "http://" + config.server.prod.host;
      return "http://" + config.server.dev.host + config.server.dev.port;
    }
  },
  //the atabase config
  database: {
    name: "innershipview",
    dev:{
      host:"localhost",
      port:"27017"
    },
    prod:{
      host:"localhost",
      port: "27017"
    },
    getConfig: function() {
      var _config = {
        name: config.database.name,
        host: config.database.dev.host,
        port: config.database.dev.port
      }

      if (config.IS_PRODUCTION_MODE) {
        _config.host = config.database.prod.host;
        _config.port = config.database.prod.port;
      }

      return _config;
    }
  },
  //the JWT user config
  JWT: {
    secretWord: "TOKEN_SECRET"
  }
};

module.exports = config;
