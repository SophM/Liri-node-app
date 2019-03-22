// ------------------------------------------------------------------
// load the packages and files needed for the program to run
// ------------------------------------------------------------------

// load the "dotenv" package to read and set any environment variables
require("dotenv").config();

// load the node-spotify-api package
// and store it in a variable
var Spotify = require("node-spotify-api");
// load the "keys.js" file and store it in a variable
// keys.js is used to access my Spotify credentials, actually stored in the hidden file ".env"
var keys = require("./keys.js");
// link my Spotify credentials and the Spotify node package to be able to call successfully the Spotify API
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
// it is a core node package, no need to install it
var fs = require("fs");


// ------------------------------------------------------------------
// variables
// ------------------------------------------------------------------

// array of actions that the user as to choose from
var actions = ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says", "Nothing, thank you!"];

// store the divider to render the data nicely in log.txt
var divider = "\n\n------------------------------------------------------------\n";


// ------------------------------------------------------------------
// Functions
// ------------------------------------------------------------------

// function to get artist/band from the user, call BandsInTown API
// and display the infos
function band() {
    // use the inquirer package to ask the user for input
    inquirer
        .prompt([
            {
                type: "input",
                message: "Which band/artist do you want infos about? - if no artist/band entered, I'll choose one! -",
                name: "artist"
            }
        ]).then(function (answer) {
            // if the user entered an artist/band
            if (answer.artist) {
                // add the user's input to the query URL
                var queryURL = "https://rest.bandsintown.com/artists/" + answer.artist.split(" ").join("%20") + "/events?app_id=liriApp";
                // console.log(queryURL);
            // otherwise...
            } else {
                // give info about Rodrigo y Gabriela
                var queryURL = "https://rest.bandsintown.com/artists/Rodrigo%20y%20Gabriela/events?app_id=liriApp";
            }
            // call the bandsInTown API using the node package "axios"
            axios
                .get(queryURL)
                // once we get the data back so if axios request is successful
                .then(function (response) {
                    // console.log(response);
                    // if there is no upcoming event for this artist/band,
                    if (response.data.length === 0) {
                        // display a message
                        console.log("Sorry, there is no upcoming events for this artist/band.")
                    // if there is upcoming event
                    } else {
                        // for every event
                        for (var i = 0; i < response.data.length; i++) {
                            // store the data in an array: 
                            var showData = [
                                // the name of the artist(s)/band
                                "Artist(s)/Band: " + response.data[i].lineup[0],
                                // the name of the venue
                                "Name of the Venue: " + response.data[i].venue.name,
                                // the venue location
                                "Venue's Location: " + response.data[i].venue.city,
                                // the date of the event (MM/DD/YYYY HH:mm)
                                "Date of event: " + moment(response.data[i].datetime).format("MM/DD/YYYY HH:mm A"),    
                            ].join("\n");

                            // print the data to the terminal
                            console.log("-----------------------------------");
                            console.log(showData);
                            console.log("-----------------------------------");
                        
                            // store the data in a file called log.txt with the "fs" node package
                            fs.appendFile("log.txt", showData + divider, function(err) {
                                // display the error if there is any
                                if (err) {
                                    console.log(err);
                                }
                            });
                        }

                    }

                    // ask the user if she/he wants to choose another option
                    chooseOption();
                })
                // if there is an error - so if the artist/band doesn't exist or is not found - typos in the name for example
                .catch(function () {
                    // display a message
                    console.log("-----------------------------------");
                    console.log("Sorry, I don't recognize this artist/band! Are you sure you wrote it right?");
                    console.log("-----------------------------------");

                    // ask the user if she/he wants to choose another option
                    chooseOption();
                });
        });
}

// function to get a movie name from the user, call OMDB API
// and display the infos
function movie() {
    // use the inquirer package to ask the user for input
    inquirer
        .prompt([
            {
                type: "input",
                message: "Which movie do you want infos about? - if no movie entered, I'll choose one! -",
                name: "movieName"
            }
        ]).then(function (answer) {
            // if the user entered a movie
            if (answer.movieName) {
                // add the user's input to the query URL
                var queryURL = "http://www.omdbapi.com/?t=" + answer.movieName.split(" ").join("+") + "&y=&plot=short&apikey=trilogy";
                // console.log(queryURL);
            // otherwise...
            } else {
                // query URL with "Mr. Nobody"
                var queryURL = "http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&apikey=trilogy"
            }
            // call the OMBD API using the node package "axios"
            axios
                .get(queryURL)
                // once we get the data back so if axios request is successful
                .then(function (response) {
                    // console.log(response.data);
                    // store the data in an array
                    var showData = [
                        // the title of the movie
                        "Title: " + response.data.Title,
                        // the year the movie came out
                        "Year released: " + response.data.Year,
                        // display the IMDB Rating of the movie
                        "IMDB Rating: " + response.data.imdbRating,
                        // the Rotten Tomatoes rating of the movie
                        "Rotten Tomatoes Rating: " + response.data.Ratings[1].Value,
                        // display the country where the movie was produced
                        "Country: " + response.data.Country,
                        // the language of the movie
                        "Language: " + response.data.Language,
                        // the plot of the movie
                        "Plot: " + response.data.Plot,
                        // the actors in the movie
                        "Actors: " + response.data.Actors,
                    ].join("\n");

                    // print the data to the terminal
                    console.log("-----------------------------------");
                    console.log(showData);
                    console.log("-----------------------------------");
                
                    // store the data in a file called log.txt with the "fs" node package
                    fs.appendFile("log.txt", showData + divider, function(err) {
                        // display the error if there is any
                        if (err) {
                            console.log(err);
                        }
                    });

                    // ask the user if she/he wants to choose another option
                    chooseOption();
                })
                // if there is an error
                // so if the song (and/or artist if entered as well) doesn't exist or is not found - typos in the name for example
                .catch(function () {
                    // display a message
                    console.log("-----------------------------------");
                    console.log("Sorry, I don't recognize this movie! Are you sure you wrote it right?");
                    console.log("-----------------------------------");

                    // ask the user if she/he wants to choose another option
                    chooseOption();
                });
        });
}

// function to get a song name from the user, call Spotify API
// and display the infos
function song() {
    // use the inquirer package to ask the user for input
    inquirer
        .prompt([
            {
                type: "input",
                message: "Which song do you want infos about? - Enter a song (artist(s)/band optional) \n- if no song entered, I'll choose one! -",
                name: "song"
            }
        ]).then(function (answer) {
            // if the user entered a song
            if (answer.song) {
                // use the node-spotify-api package to call the Spotify API with the user's input
                spotify
                    .search({ type: "track", query: answer.song, limit: 1 }, function (err, data) {
                        // if an error occured so song doesn't exist or not recognized - typos in name for example
                        if (err) {
                            // display a message
                            console.log("-----------------------------------");
                            console.log("Sorry, I don't recognize this song! Are you sure you wrote it right?");
                            console.log("-----------------------------------");

                            // ask the user if she/he wants to choose another option
                            chooseOption();
                        }
                        // if no error, display the info
                        // console.log(JSON.stringify(data, null, 2));
                        // define a variable to refer to the data more easily
                        var results = data.tracks.items[0];
                        // console.log(JSON.stringify(results, null, 2));
                        
                        // store the data in an array
                        var showData = [
                            // the name(s) of artist(s)/band
                            "Artist(s)/Band: " + results.artists[0].name,
                            // the name of the song
                            "Name of the song: " + results.name,
                            // the Spotify link of the song
                            "Spotify link of the song: " + results.external_urls.spotify,
                            // the name of the album the song is from
                            "Name of the album: " + results.album.name,
                        ].join("\n");

                        // print the data to the terminal
                        console.log("-----------------------------------");
                        console.log(showData);
                        console.log("-----------------------------------");
                
                        // store the data in a file called log.txt with the "fs" node package
                        fs.appendFile("log.txt", showData + divider, function(err) {
                            // display the error if there is any
                            if (err) {
                                console.log(err);
                            }
                        });

                        // ask the user if she/he wants to choose another option
                        chooseOption();

                    });
                // if the user didn't enter a song  
            } else {
                // use the node-spotify-api package to call the Spotify API with "Despair, Hangover & Ecstasy" by The Do
                spotify
                    .search({ type: "track", query: "Despair, Hangover & Ecstasy", limit: 1 }, function (err, data) {
                        // if an error occured so song doesn't exist or not recognized - typos in name for example
                        if (err) {
                            // display a message
                            console.log("-----------------------------------");
                            console.log("Sorry, I don't recognize this song! Are you sure you wrote it right?");
                            console.log("-----------------------------------");

                            // ask the user if she/he wants to choose another option
                            chooseOption();
                        }
                        // if no error, display the info
                        // define a variable to refer to the data more easily
                        var results = data.tracks.items[0];

                        // store the data in an array
                        var showData = [
                            // the name(s) of artist(s)/band
                            "Artist(s)/Band: " + results.artists[0].name,
                            // the name of the song
                            "Name of the song: " + results.name,
                            // the Spotify link of the song
                            "Spotify link of the song: " + results.external_urls.spotify,
                            // the name of the album the song is from
                            "Name of the album: " + results.album.name,
                        ].join("\n");

                        // print the data to the terminal
                        console.log("-----------------------------------");
                        console.log(showData);
                        console.log("-----------------------------------");
                
                        // store the data in a file called log.txt with the "fs" node package
                        fs.appendFile("log.txt", showData + divider, function(err) {
                            // display the error if there is any
                            if (err) {
                                console.log(err);
                            }
                        });

                        // ask the user if she/he wants to choose another option
                        chooseOption();
                    });
            }
        });
}

// function for "do-what-it-says" - will call the SPOTIFY API
function whatItSays() {
    // get the info from random.text with fs
    fs
        .readFile("random.txt", "utf8", function (error, data) {

            // If there is error, display it.
            if (error) {
                return console.log(error);
            }

            // console.log(data);

            // call the Spotify API with the content of random.txt, which correspond to "Logical Song" by Supertramp
            spotify
                .search({ type: "track", query: data, limit: 1 }, function (err, data) {
                    // if an error occured, display it
                    if (err) {
                        return console.log("Error occurred: " + err);
                    }
                    // if no error, display the info
                    // define a variable to refer to the data more easily
                    var results = data.tracks.items[0];

                    // store the data in an array
                    var showData = [
                        // the name(s) of artist(s)/band
                        "Artist(s)/Band: " + results.artists[0].name,
                        // the name of the song
                        "Name of the song: " + results.name,
                        // the Spotify link of the song
                        "Spotify link of the song: " + results.external_urls.spotify,
                        // the name of the album the song is from
                        "Name of the album: " + results.album.name,
                    ].join("\n");

                    // print the data to the terminal
                    console.log("-----------------------------------");
                    console.log(showData);
                    console.log("-----------------------------------");
            
                    // store the data in a file called log.txt with the "fs" node package
                    fs.appendFile("log.txt", showData + divider, function(err) {
                        // display the error if there is any
                        if (err) {
                            console.log(err);
                        }
                    });

                    // ask the user if she/he wants to choose another option
                    chooseOption();
                });
        });

}

// function to ask the user to choose an action from the list defined previously
// and run the appropriate function accordingly
function chooseOption() {
    // ask the user to choose an option
    inquirer
        .prompt([
            {
                type: "rawlist",
                message: "What can I help you with? - Choose an option",
                choices: actions,
                name: "userChoice"
            }
        ]).then(function (answer) {
            // if the user choice is "concert-this"
            if (answer.userChoice === actions[0]) {
                // run the band() function
                band();
                // if the user choice is "spotify-this-song"
            } else if (answer.userChoice === actions[1]) {
                // run the spotify() function
                song();
                // if the user choice is "movie-this"
            } else if (answer.userChoice === actions[2]) {
                // run the movie() function
                movie();
                // if the user choice is "do-what-it-says"
            } else if (answer.userChoice === actions[3]) {
                // run the whatItSays() function
                whatItSays();
                // if the user choice is "Nothing, thank you!"
            } else if (answer.userChoice === actions[4]) {
                // display message
                console.log("-----------------------------------");
                console.log("Ok, see you next time!");
                console.log("-----------------------------------");
            }
        });
}


// ------------------------------------------------------------------
// Main process
// ------------------------------------------------------------------

// welcome the user
console.log("-----------------------------------");
console.log("Welcome! I am Liri, a Language Interpretation and Recognition Interface.");
console.log("-----------------------------------");
// ask the user to choose an option
chooseOption();


