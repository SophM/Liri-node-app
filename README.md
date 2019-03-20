# Liri 

In this project, I built a Language Interpretation and Recognition Interface, called Liri.

Liri is meant to be run in the terminal, using Node.js. Node.js is an open-source JavaScript runtime environment, that allows to execute JavaScript code outside of a browser. Several node packages have to be installed for Liri to run properly. They are listed in "liri.js", along with guidelines for the installation.
After installing the required packages, type `node liri.js` in your terminal to run liri and get started!

So far, Liri proposes 5 options to the user:
- concert-this
- spotify-this-song
- movie-this
- do-what-it-says
- Nothing, thank you!

**concert-this**<br>
This option calls the BandsInTown API (using the "axios" node package) and lists the upcoming event information related to the user input. So after choosing this option, the user is asked to enter the name of a band or artist(s). If she/he doesn't enter a band or artist(s), the API is called with a default value (set to "Rodrigo y Gabriela", an amazing duo of guitar player!).
The infos displayed are: the name of the band/artist(s), the name of the venue, the location of the venue and the date and time of the venue. The date and time of the venue have been converting with Moment.js.
If there is no event coming up, a "sorry" message is displayed.

**spotify-this-song**<br>
This option calls the Spotify API (using the "node-spotify-api" node package) and displays information related to the user input. So after choosing this option, the user is asked to enter the name of a song. If she/he doesn't enter song, the API is called with a default value (set to "Despair, Hangover & Ecstasy" by the Do, a great song!).
The infos displayed are: the name of the band/artist(s), the name of the song, the Spotify link of the song and the name of the album the song is from.

**movie-this**<br>
This option calls the OMDB API (using the "axios" node package) and displays information related to the user input. So after choosing this option, the user is asked to enter the name of a movie. If she/he doesn't enter a movie, the API is called with a default value (set to "Mr. Nobody", a great movie!).
The infos displayed are: the title of the movie, the year the movie came out, the IMDB Rating of the movie, the Rotten Tomatoes Rating of the movie, the country where the movie was produced, the language of the movie, the plot of the movie and the actors in the movie.

**do-what-it-says**<br>
This option calls the Spotify API (using the "node-spotify-api" node package) and displays information related to the data present in the file "random.txt". The data in "random.txt" is the name of a song, "Logical Song" by Supertramp - one of my favorite band!

**Nothing, thank you!**<br>
This option allows the user to quit Liri. After choosing this option, a "good bye" message is displayed and Liri closes.

---

### Technologies used

To build this project, I used the following technologies:

- Node.js
- JavaScript/jQuery

---

### Video of Liri in action











