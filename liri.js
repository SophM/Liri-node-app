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

// function to get artist/ band from user, call BandsInTown API
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
            // add user's answer to the query URL
            var queryURL = "https://rest.bandsintown.com/artists/" + answer.artist.split(' ').join('%20') + "/events?app_id=codingbootcamp";
            console.log(queryURL);
            // call the bandsInTown API using the node package "axios"
            axios
                .get(queryURL)
                // once we get the data back so if axios request is successful
                .then(function (response) {
                    // console.log(response.data);
                    // for each event 
                    for (var i = 0; i < response.data.length; i++) {
                    // display the name of the venue - in the terminal
                    console.log("-------------------------------------------------");
                    console.log("Name of the Venue: " + response.data[i].venue.name);
                    // display venue location - in the terminal
                    console.log("Venue's Location: " + response.data[i].venue.city);
                    // display date of the event (MM/DD/YYYY) - in the terminal
                    console.log("Date of event: " + moment(response.data[i].datetime).format("MM/DD/YYYY HH:mm A"));
                    console.log("-------------------------------------------------"); 
                    }
                });
        })
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
            // ask the user which movie does he/she want info about
            inquirer
                .prompt([
                    {
                        type: "input",
                        message: "Which movie do you want infos about?",
                        name: movie
                    }
                ]).then(function (answer) {
                    // add user's answer to the query URL
                    var queryURL = "https://rest.bandsintown.com/artists/" + answer.movie + "/events?app_id=codingbootcamp";
                    // call the bandsInTown API using the node package "axios"
                    axios
                        .get(queryURL)
                        // once we get the data back so if axios request is successful
                        .then(function (response) {
                            console.log(response);
                            // display the name of the venue - in the terminal
                            console.log("Name of the Venue: " + response.data.Year);
                            // display venue location - in the terminal
                            console.log("Venue's Location: " + response.data.Year);
                            // display date of the event (MM/DD/YYYY) - in the terminal
                            console.log("Date of event: " + response.data.Year);
                        });
                })


        } else if (answer.userChoice === actions[3]) {



        }

    })