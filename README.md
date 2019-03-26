# Liri 

In this project, I built a Language Interpretation and Recognition Interface, called Liri.

Liri is meant to be run in the terminal, using Node.js. Node.js is an open-source JavaScript runtime environment, that allows to execute JavaScript code outside of a browser. 

So far, Liri proposes 5 options to the user - main menu:
- concert-this
- spotify-this-song
- movie-this
- do-what-it-says
- Nothing, thank you!

**concert-this**<br>
This option calls the BandsInTown API (using the "axios" node package) and lists the upcoming event information related to the user input. So after choosing this option, the user is asked to enter the name of a band or artist(s). If she/he doesn't enter a band or artist(s), the API is called with a default value (set to "Rodrigo y Gabriela", an amazing duo of guitar players!).
The infos given are: the name of the band/artist(s), the name of the venue, the location of the venue and the date and time of the venue. The date and time of the venue have been converting with Moment.js.
The infos are displayed in the terminal as well as stored in a file called "log.txt".
If there is no event coming up, a "sorry" message is displayed and the main "menu" is shown for the user to choose an option again. If the artist(s)/band is not found or recognized, a "sorry" message is displayed and the main menu is shown as well.

**spotify-this-song**<br>
This option calls the Spotify API (using the "node-spotify-api" node package) and displays information related to the user input. So after choosing this option, the user is asked to enter the name of a song (and the name of the artist(s)/band if desired - this is optional). If she/he doesn't enter song, the API is called with a default value (set to "Despair, Hangover & Ecstasy" by the Do, a great song!).
The infos given are: the name of the band/artist(s), the name of the song, the Spotify link of the song and the name of the album the song is from.
The infos are displayed in the terminal as well as stored in a file called "log.txt". 
If the song (and/or artist if entered as well) is not found or recognized, a "sorry" message is displayed and the main menu is shown for the user to choose an option again.

**movie-this**<br>
This option calls the OMDB API (using the "axios" node package) and displays information related to the user input. So after choosing this option, the user is asked to enter the name of a movie. If she/he doesn't enter a movie, the API is called with a default value (set to "Mr. Nobody", a great movie!).
The infos given are: the title of the movie, the year the movie came out, the IMDB Rating of the movie, the Rotten Tomatoes Rating of the movie, the country where the movie was produced, the language of the movie, the plot of the movie and the actors in the movie.
The infos are displayed in the terminal as well as stored in a file called "log.txt".
If the movie is not found or recognized, a "sorry" message is displayed and the main menu is shown for the user to choose an option again.

**do-what-it-says**<br>
This option calls the Spotify API (using the "node-spotify-api" node package) and displays information related to the data present in the file "random.txt". The data in "random.txt" is the name of a song, "Logical Song" by Supertramp - one of my favorite bands!
The infos given are: the name of the band/artist(s), the name of the song, the Spotify link of the song and the name of the album the song is from.
The infos are displayed in the terminal as well as stored in a file called "log.txt".

**Nothing, thank you!**<br>
This option allows the user to quit Liri. After choosing this option, a "good bye" message is displayed and Liri closes.

---

### Getting set up

Several node packages have to be installed for Liri to run properly. Follow the steps below to get set up:

1. Using your terminal, navigate to the folder containing liri.js.

2. If you DON'T have a file called "package.json" in your folder, run: `npm init -y` to create this file. If you do have this file, skip this step.

3. Install the node packages, one after the other - the order doesn't matter - by running:
- `npm install dotenv` 
- `npm install inquirer`
- `npm install axios`
- `npm install --save node-spotify-api`
- `npm install moment`

4. After installing the required packages, type `node liri.js` in your terminal to start using liri!

---

### Technologies used

To build this project, I used the following technologies:

- Node.js
- JavaScript/jQuery

---

### GIF showing Liri in action

![GIF showing Liri in action](https://github.com/SophM/Liri-node-app/blob/master/assets/for-readme/gif-showing-liri-working.gif?raw=true)

---

### GIF showing Liri handling an error with "concert-this" as an example

![GIF showing Liri handling an error](https://github.com/SophM/Liri-node-app/blob/master/assets/for-readme/gif-showing-handling-error.gif?raw=true)

--- 

### Contribution

- Sophie Mallez











