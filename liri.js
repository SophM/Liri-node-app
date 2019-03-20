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

// load the "keys.js" file and store it in a variable
// var keys = require("./keys.js");

// access keys information for Sportify API
// var spotify = new Spotify(keys.spotify);

// load the axios package to request data from OMBD and BandInTown APIs
var axios = require("axios");

// load the "inquirer" package to get user input
var inquirer = require("inquirer");

// load the "moment" package to display the date of the concert in DD/MM/YYYY
var moment = require("moment");


// ------------------------------------------------------------------
// variables
// ------------------------------------------------------------------

// array of actions that the user as to choose from
var actions = ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says"];


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
            var queryURL = "https://rest.bandsintown.com/artists/" + answer.artist.split(" ").join("%20") + "/events?app_id=codingbootcamp";
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
                message: "Which movie do you want infos about? - if no movie entered, you will get info on Mr. Nobody -",
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
                    });

            }   
        });
}



// ------------------------------------------------------------------
// Main process
// ------------------------------------------------------------------


// welcome the user
console.log("Welcome! I am Liri, a Language Interpretation and Recognition Interface.");
// ask the user to choose an action from a list defined previously
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

        } else if (answer.userChoice === actions[1]) {


        } else if (answer.userChoice === actions[2]) {
            // run the movie() function
            movie();

        } else if (answer.userChoice === actions[3]) {



        }

    })