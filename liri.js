const dotenv = require("dotenv").config();
var request = require("request");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var inquirer = require("inquirer");
var Twitter = require("twitter");
var imdb = require('imdb-api');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
// var ImdbApi = new ImdbApi(keys.imdb);

// console.log(keys.imdb)

inquirer.prompt([{
    type: "list",
    name: "entertainment",
    message: "You gonna Tweet, Listen, Watch or Let me do what AIs do?",
    choices: ["my-tweets", "spotify-this-song", "movie-this", "AI select"]
}]).then(function(user) {

    var params = { screen_name: 'mumpdiggity' };
    if (user.entertainment === "my-tweets") {
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
            if (!error) {
                var parsedTweets = [];
                for (i = 0; i < 3; i++) {
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
                if (listen.song.length < 1) {
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

                const fs = require('fs');

                fs.writeFile('./movies.js', `var shows = ${body}; module.exports = shows;`, err => {
                    if (err) {
                        throw err;
                    }

                    var movieResults = require("./movies.js")
                    for (var key in movieResults) {
                        if (key === 'Title' ||
                            key === 'Year' ||
                            key === 'Language' ||
                            key === 'Plot' ||
                            key === 'Actors') {
                            var finalResult = movieResults[key].split(",")
                            console.log(finalResult[0]);
                        }
                        if (key === 'Ratings') {
                            console.log(movieResults[key][0]);
                            console.log(movieResults[key][1]);
                        }
                        if (key === 'Country') {
                            var finalResult = movieResults[key].split(",")
                            console.log(finalResult[0]);
                        }
                    };
                });
            });
        });
    } else if (user.entertainment === "AI select") {
        var fs = require("fs");

        fs.readFile("random.txt", "utf8", function(error, songData) {

            if (error) {
                return console.log(error);
            }
            var dataArr = songData.split(",");
            spotify.search({ type: 'track', query: dataArr[1], limit: 1, client }, function(err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                if (songData.length < 1) {
                    return console.log('No songs were found!');
                }
                var results = data.tracks.items[0];
                console.log(`                Artist: ${results.album.artists[0].name}
                Song: ${data.tracks.items[0].name}
                Link: ${data.tracks.items[0].preview_url}
                Album: ${results.album.name} `);
            });
        });

    }
});