
var Twit = require('twit');
var databaseManager = require('./database');
var modelNames = require("../models/names/model").names;


//['bananas', 'oranges', 'strawberries']
var test = {
  stream: null,
  twit: new Twit({
      consumer_key:           '8CWMHPpeVBjsoFOWCzZQjzB7T'
      , consumer_secret:      'ZW3KoVCs5yHRfew2bDp8yGFisklqmSe2rH85yOnAW5QRZRauXm'
      , access_token:         '2494404708-Wc3mUr3HKyQt1CutpGdE0pT5DEgjOimHWnaxMp8'
      , access_token_secret:  'dlBJCEytVBibXJKvqh0W6Jq1EbVvgsxbiuJOFV8uwAUD4'
  }),
  start: function(names, onTwit){
    this.stream = this.twit.stream('statuses/filter', { track: names});
    this.stream.on('tweet', function (tweet) {      
      onTwit(tweet);
    });
  },
  stop: function(){
    if(this.stream == null) return;
    this.stream.stop();
  }
}

module.exports = test;
