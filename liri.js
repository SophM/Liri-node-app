// ------------------------------------------------------------------
// install the packages and files needed for the program to runs
// ------------------------------------------------------------------

// in the folder containing liri.js

// install the "dotenv" package by running "npm install dotenv" in your terminal
// install the "inquirer" package by running "npm install inquirer" in your terminal 
// install the "axios" package by running "npm install axios" in your terminal
// install the "node-spotify-api" package by running "npm install --save node-spotify-api" in your terminal
// install the "moment" package by running "npm install moment" in your terminal



// ------------------------------------------------------------------
// load the packages and files needed for the program to runs
// ------------------------------------------------------------------

// load the "dotenv" package to read and set any environment variables
require("dotenv").config();

// load the "keys.js" file and store it in a variable
var keys = require("./keys.js");

// access keys information for Sportify API
var spotify = new Spotify(keys.spotify);

// load the axios package to request data from OMBD and BandInTown APIs
var axios = require("axios");

// load the "inquirer" package to get user input
var inquirer = require("inquirer");

// load the "moment" package to display the date of the concert in DD/MM/YYYY
var moment = require("moment");



