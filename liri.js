// ------------------------------------------------------------------
// install the packages needed for the program to run
// ------------------------------------------------------------------

// in the folder containing liri.js:

// install the "dotenv" package by running "npm install dotenv" in your terminal
// install the "inquirer" package by running "npm install inquirer" in your terminal 
// install the "axios" package by running "npm install axios" in your terminal
// install the "node-spotify-api" package by running "npm install --save node-spotify-api" in your terminal
// install the "moment" package by running "npm install moment" in your terminal


// ------------------------------------------------------------------
// load the packages and files needed for the program to run
// ------------------------------------------------------------------

// load the "dotenv" package to read and set any environment variables
require("dotenv").config();

// load the node-spotify-api package
// and store it in the variable "Spotify"
var Spotify = require("node-spotify-api");
// load the "keys.js" file and store it in a variable
var keys = require("./keys.js");
// access my credentials stored in "keys" to be able to call successfully the Spotify API
var spotify = new Spotify(keys.spotify);

// load the axios package to request data from OMBD and BandInTown APIs
// and store it in the variable "axios"
var axios = require("axios");

// load the "inquirer" package to get user input
// and store it in the variable "inquirer"
var inquirer = require("inquirer");

// load the "moment" package to display the date of the concert in DD/MM/YYYY
var moment = require("moment");

// load the fs package for reading and writing files
var fs = require("fs");


// ------------------------------------------------------------------
// variables
// ------------------------------------------------------------------

// array of actions that the user as to choose from
var actions = ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says", "Nothing, thank you!"];

// variable to ask the user again or not depending on the case
var startOver = true;


// ------------------------------------------------------------------
// Functions
// ------------------------------------------------------------------

// function to get artist/band from the user, call BandsInTown API
// and display the infos
function band() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Which band/artist do you want infos about?",
                name: "artist"
            }
        ]).then(function (answer) {
            // add the user's input to the query URL
            var queryURL = "https://rest.bandsintown.com/artists/" + answer.artist.split(" ").join("%20") + "/events?app_id=liriApp";
            // console.log(queryURL);
            // call the bandsInTown API using the node package "axios"
            axios
                .get(queryURL)
                // once we get the data back so if axios request is successful
                .then(function (response) {
                    // console.log(response.data);
                    // if there is no upcoming event for this artist/band,
                    if (response.data.length === 0) {
                        // display a message
                        console.log("Sorry, there is no upcoming events for this artist/band.")
                        // if there is upcoming events,
                    } else {
                        // for each event, 
                        for (var i = 0; i < response.data.length; i++) {
                            // display the name of the venue - in the terminal
                            console.log("-------------------------------------------------");
                            console.log("Name of the Venue: " + response.data[i].venue.name);
                            // display the venue location - in the terminal
                            console.log("Venue's Location: " + response.data[i].venue.city);
                            // display the date of the event (MM/DD/YYYY HH:mm) - in the terminal
                            console.log("Date of event: " + moment(response.data[i].datetime).format("MM/DD/YYYY HH:mm A"));
                            console.log("-------------------------------------------------");
                        }
                    }
                })
                // if there is error, display it
                .catch(function (err) {
                    console.log(err);
                });
        });
}

// function to get a movie name from the user, call OMDB API
// and display the infos
function movie() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Which movie do you want infos about? - if no movie entered, I'll choose one! -",
                name: "movieName"
            }
        ]).then(function (answer) {
            // if the user entered a movie,
            if (answer.movieName) {
                // add the user's input to the query URL
                var queryURL = "http://www.omdbapi.com/?t=" + answer.movieName.split(" ").join("+") + "&y=&plot=short&apikey=trilogy";
                // console.log(queryURL);
                // call the OMBD API using the node package "axios"
                axios
                    .get(queryURL)
                    // once we get the data back so if axios request is successful
                    .then(function (response) {
                        // console.log(response.data);
                        // display the title of the movie - in the terminal
                        console.log("-------------------------------------------------");
                        console.log("Title: " + response.data.Title);
                        // display the year the movie came out - in the terminal
                        console.log("Year released: " + response.data.Year);
                        // display the IMDB Rating of the movie - in the terminal
                        console.log("IMDB Rating: " + response.data.imdbRating);
                        // display the Rotten Tomatoes Rating of the movie - in the terminal
                        console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                        // display the Country where the movie was produced - in the terminal
                        console.log("Country: " + response.data.Country);
                        // display the Language of the movie - in the terminal
                        console.log("Language: " + response.data.Language);
                        // display the Plot of the movie - in the terminal
                        console.log("Plot: " + response.data.Plot);
                        // display the Actors in the movie - in the terminal
                        console.log("Actors: " + response.data.Actors);
                        console.log("-------------------------------------------------");
                    })
                    // if there is error, display it
                    .catch(function (err) {
                        console.log(err);
                    });
                // if the user didn't enter a movie, give info for the movie "Mr. Nobody"
            } else {
                // call the OMBD API using the node package "axios"
                axios
                    .get("http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&apikey=trilogy")
                    // once we get the data back so if axios request is successful
                    .then(function (response) {
                        // display the title of the movie - in the terminal
                        console.log("-------------------------------------------------");
                        console.log("Title: " + response.data.Title);
                        // display the year the movie came out - in the terminal
                        console.log("Year released: " + response.data.Year);
                        // display the IMDB Rating of the movie - in the terminal
                        console.log("IMDB Rating: " + response.data.imdbRating);
                        // display the Rotten Tomatoes Rating of the movie - in the terminal
                        console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                        // display the Country where the movie was produced - in the terminal
                        console.log("Country: " + response.data.Country);
                        // display the Language of the movie - in the terminal
                        console.log("Language: " + response.data.Language);
                        // display the Plot of the movie - in the terminal
                        console.log("Plot: " + response.data.Plot);
                        // display the Actors in the movie - in the terminal
                        console.log("Actors: " + response.data.Actors);
                        console.log("-------------------------------------------------");
                    })
                    // if there is error, display it
                    .catch(function (err) {
                        console.log(err);
                    });

            }
        });
}

// function to get a song name from the user, call Spotify API
// and display the infos
function song() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Which song do you want infos about? - if no song entered, I'll choose one! -",
                name: "song"
            }
        ]).then(function (answer) {
            // if the user entered a song,
            if (answer.song) {
                // use the node-spotify-api package to call the Spotify API with the user's input
                spotify
                    .search({ type: "track", query: answer.song, limit: 1 }, function (err, data) {
                        // if an error occured, display it
                        if (err) {
                            return console.log("Error occurred: " + err);
                        }
                        // if no error, display the info
                        // console.log(JSON.stringify(data, null, 2));
                        // define a variable to refer to the data more easily
                        var results = data.tracks.items[0];
                        // console.log(JSON.stringify(results, null, 2));
                        // display the name(s) of artist(s)/band - in the terminal
                        console.log("-------------------------------------------------");
                        console.log("Artist(s)/Band: " + results.artists[0].name);
                        // display the name of the song - in the terminal
                        console.log("Name of the song: " + results.name);
                        // display the Spotify link of the song - in the terminal
                        console.log("Spotify link of the song: " + results.external_urls.spotify);
                        // display the name of the album the song is from - in the terminal
                        console.log("Name of the album: " + results.album.name);
                        console.log("-------------------------------------------------");

                    });
                // if the user didn't enter a song  
            } else {
                // use the node-spotify-api package to call the Spotify API with 'The Sign' by Ace of Base
                spotify
                    .search({ type: "track", query: "Despair, Hangover & Ecstasy", limit: 1 }, function (err, data) {
                        // if an error occured, display it
                        if (err) {
                            return console.log("Error occurred: " + err);
                        }
                        // if no error, display the info
                        // define a variable to refer to the data more easily
                        var results = data.tracks.items[0];
                        // display the name(s) of artist(s)/band - in the terminal
                        console.log("-------------------------------------------------");
                        console.log("Artist(s)/Band: " + results.artists[0].name);
                        // display the name of the song - in the terminal
                        console.log("Name of the song: " + results.name);
                        // display the Spotify link of the song - in the terminal
                        console.log("Spotify link of the song: " + results.external_urls.spotify);
                        // display the name of the album the song is from - in the terminal
                        console.log("Name of the album: " + results.album.name);
                        console.log("-------------------------------------------------");
                    });
            }
        });
}

// function for "do-what-it-says"
function whatItSays() {
    // get the info from random.text with fs
    fs
        .readFile("random.txt", "utf8", function (error, data) {

            // If there is error, display it.
            if (error) {
                return console.log(error);
            }

            // console.log(data);
            // transform the data into an array
            var dataArr = data.split(",");
            // console.log(dataArr[1]);

            // call the Spotify API with the second element of dataArr, which correspond to the name of the song
            spotify
                .search({ type: "track", query: dataArr[1], limit: 1 }, function (err, data) {
                    // if an error occured, display it
                    if (err) {
                        return console.log("Error occurred: " + err);
                    }
                    // if no error, display the info
                    // define a variable to refer to the data more easily
                    var results = data.tracks.items[0];
                    // display the name(s) of artist(s)/band - in the terminal
                    console.log("-------------------------------------------------");
                    console.log("Artist(s)/Band: " + results.artists[0].name);
                    // display the name of the song - in the terminal
                    console.log("Name of the song: " + results.name);
                    // display the Spotify link of the song - in the terminal
                    console.log("Spotify link of the song: " + results.external_urls.spotify);
                    // display the name of the album the song is from - in the terminal
                    console.log("Name of the album: " + results.album.name);
                    console.log("-------------------------------------------------");
                });
        });

}

// function to ask the user to choose an action from the list defined previously
// and run the appropriate function accordingly
function chooseOption() {
    // if the variable "startOver" is set to true
    if (startOver) {
        // ask the user to choose an option
        inquirer
            .prompt([
                {
                    type: "rawlist",
                    message: "What can I help you with today? - Choose an option",
                    choices: actions,
                    name: "userChoice"
                }
            ]).then(function (answer) {
                // if the user choice is "concert-this"
                if (answer.userChoice === actions[0]) {
                    // run the band() function
                    band();
                    // ask again the user to choose an option if startOver is set to true
                    chooseOption(); 
                // if the user choice is "spotify-this-song"
                } else if (answer.userChoice === actions[1]) {
                    // run the spotify() function
                    song();
                    // ask again the user to choose an option if startOver is set to true
                    chooseOption();
                    // if the user choice is "movie-this"
                } else if (answer.userChoice === actions[2]) {
                    // run the movie() function
                    movie();
                    // ask again the user to choose an option if startOver is set to true
                    chooseOption();
                    // if the user choice is "do-what-it-says"
                } else if (answer.userChoice === actions[3]) {
                    // run the whatItSays() function
                    whatItSays();
                    // ask again the user to choose an option if startOver is set to true
                    chooseOption();
                } else if (answer.userChoice === actions[4]) {
                    // set the "startOver" variable to false
                    startOver = false;
                }
            });
    } else {
        // display a "good-bye" message
        console.log("Ok, see you next time!");
    }
}


// ------------------------------------------------------------------
// Main process
// ------------------------------------------------------------------

// welcome the user
console.log("Welcome! I am Liri, a Language Interpretation and Recognition Interface.");
// ask the user to choose an option
chooseOption();


