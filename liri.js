const dotenv = require("dotenv").config();
var request = require("request");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");

// console.log(keys.twitter)

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var params = { screen_name: 'mumpdiggity' };

client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
        var parsedTweets = [];
        for (i = 0; i < 1; i++) {
            parsedTweets.push(JSON.stringify(tweets[i].text));
        }
        console.log(parsedTweets);
    }
});

spotify.search({ type: 'track', query: "I'm the one", limit: 1, client }, function(err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }

    console.log(data);
});