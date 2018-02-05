const dotenv = require("dotenv").config();
var request = require("request");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var inquirer = require("inquirer");
var Twitter = require("twitter");
// var omdbApi = require('omdb-client');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
// var omdbKey = new Omdb(keys.omdb);

// console.log(keys.Omdb)

inquirer.prompt([{
    type: "list",
    name: "entertainment",
    message: "You gonna Tweet, Listen, or Watch?",
    choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"]
}]).then(function(user) {

    var params = { screen_name: 'mumpdiggity' };
    if (user.entertainment === "my-tweets") {
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
            if (!error) {
                var parsedTweets = [];
                for (i = 0; i < 1; i++) {
                    parsedTweets.push(JSON.stringify(tweets[i].text));
                }
                console.log(parsedTweets);
            }
        });
    } else if (user.entertainment === "spotify-this-song") {

        inquirer.prompt([{
            type: "input",
            name: "song",
            message: "What do you want to listen to?",
            default: "The Sign Ace of Base"
        }]).then(function(listen) {
            spotify.search({ type: 'track', query: listen.song, limit: 1, client }, function(err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                if (song.length < 1) {
                    return console.log('No songs were found!');
                }
                var results = data.tracks.items[0];
                console.log(`                Artist: ${results.album.artists[0].name}
                Song: ${data.tracks.items[0].name}
                Link: ${data.tracks.items[0].preview_url}
                Album: ${results.album.name} `);
            });
        });
    } else if (user.entertainment === "movie-this") {
        inquirer.prompt([{
            type: "input",
            name: "movie",
            message: "What do you want to watch?",
            default: "Mr. Nobody"
        }]).then(function(watch) {
            request(`http://www.omdbapi.com/?t=${watch.movie}&y=&plot=short&apikey=trilogy`, function(error, response, body) {

                // If the request is successful (i.e. if the response status code is 200)
                if (!error && response.statusCode === 200) {
                    var array1 = [];
                    var responsestring = JSON.stringify(body.Title);

                    responsestring.push(array1);
                    // Parse the body of the site and recover just the imdbRating
                    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
                    console.log(`                Title: ${responsestring}`);
                    console.log(array);
                    // Released: ${body.Year}
                    // IMDB Rating: ${body.imdbRating}
                    // Rotten Tomatoes Rating: ${body.Ratings}
                    // Location: ${body.Country}
                    // Language: ${body.Language}
                    // Plot: ${body.Plot}
                    // Cast:  ${body.Actors} `);
                }
            });
        });
    }
});

// });