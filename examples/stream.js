//
//  Bot
//  class for performing various twitter actions
//
var Twit = require('../lib/twitter');
//
// I only want to see tweets about my favorite fruits
//

var T = new Twit({
    consumer_key:         '8CWMHPpeVBjsoFOWCzZQjzB7T'
    , consumer_secret:      'ZW3KoVCs5yHRfew2bDp8yGFisklqmSe2rH85yOnAW5QRZRauXm'
    , access_token:         '2494404708-Wc3mUr3HKyQt1CutpGdE0pT5DEgjOimHWnaxMp8'
    , access_token_secret:  'dlBJCEytVBibXJKvqh0W6Jq1EbVvgsxbiuJOFV8uwAUD4'
});

/*function dump(obj) {
    var out = '';
    for (var i in obj) {
        out += i + ": " + obj[i] + "\n";
    }
    alert(out);
    // or, if you wanted to avoid alerts...
    var pre = document.createElement('pre');
    pre.innerHTML = out;
    document.body.appendChild(pre)
}*/

// same result as doing { track: 'bananas,oranges,strawberries' }
var stream = T.stream('statuses/filter', { track: ['bananas', 'oranges', 'strawberries'] })

stream.on('tweet', function (tweet) {
    console.log(tweet["user"]["screen_name"]);
    console.log(tweet["user"]["location"]);
    console.log(tweet["created_at"]);
    //dump(tweet);
});



