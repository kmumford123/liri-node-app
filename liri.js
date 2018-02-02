const dotenv = require("dotenv").config("./.env");
var request = require("request");
var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

request(`https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=twitterapi&count=2`, function(error, response, body) {
    if (!error && response.statusCode === 200) {
        console.log(body);
    }
});