

var artists = ["KENDRICK LAMAR", "DRAKE", "JAY Z", "CARDI B", "ASAP ROCKY", "KANYE WEST", "MEEK MILL", "MIKE JONES", "CHRIS BROWN", "BUSTA RHYMES", "LIL WAYNE", "SNOOP DOGG", "LUDACRIS", "DR DRE", "NAS", "TUPAC SHAKUR", "TYGA", "EMINEM"];
var winCount = 0;

var artist = "";
var artistLongString = "";
var underscoreString = "";
var gameIsRunning = false;

var youtubeTags = 
{
    "KENDRICK LAMAR": "QjlFqgRbICY",
    "DRAKE" : "jIFajIQRRak",
    "JAY Z" : "fklotOPfGUc",
    "CARDI B": "Z3G8YUDU0ZU",
    "ASAP ROCKY": "7EmGuzoNJYc",
    "KANYE WEST": "Qci1KpwwJ-s",
    "MEEK MILL": "J03cag5Lf4s",
    "MIKE JONES": "U-krqF1DVUg", 
    "CHRIS BROWN": "KZdwPP1NWPo",
     "BUSTA RHYMES": "jQvYY9ok-to",
     "LIL WAYNE": "p8Z4BZenHG4", 
    "SNOOP DOGG": "kI-o24BpKE0" ,
     "LUDACRIS": "KvP7aDJHMog",
    "DR DRE": "dA4GXRU1SKA",
     "NAS": "QNuMwkipz6M", 
     "TUPAC SHAKUR": "j76R9UTlglA", 
     "TYGA" : "VXXHlsoBS2k",
     "EMINEM" : "Dn3qfGz_Yq8"
}

// get next artist name
function RunGame() {
    gameIsRunning = true; 
    var container = document.getElementsByClassName("container-content"); 
    container[0].style.display = "block";
    var startButton = document.getElementById("start-button");
    startButton.innerText = "Play Again";
    
    artist = artists[Math.floor(Math.random() * artists.length)];
    hangmanString(artist);
    
    var artistName = document.getElementById("artist-caption");
    artistName.innerText = "Who could it be?";

    var artistImage = document.getElementById("artist-image"); 
    artistImage.src = "assets/images/avatar.png"; 

    var youtube = document.getElementById("youtube");
    youtube.style.display = "none"

    var guess = document.getElementById("guesses");
    guess.innerHTML = underscoreString; 
    var numGuesses = document.getElementById("guesses-remaining");
    numGuesses.innerHTML = 10; 
    var wrongGuess = document.getElementById("wrong-guesses");
    wrongGuess.innerHTML = ""; 
    var wrongInput = document.getElementById("wrong-input");
    wrongInput.innerHTML = ""; 
}


// fuction to makes artist string hangman-playable. 
// ex) artistLongString = Meek Mill -   M E E K  M I L L
// ex) underscoreString =               _ _ _ _  _ _ _ _ 
function hangmanString(artist) {
    artistLongString = "";
    underscoreString = "";
    for (var i = 0; i < artist.length; i++) {
        if (artist[i] === " ") {
            artistLongString += "  ";
            underscoreString += "  ";
        }
        else {
            artistLongString += artist[i] + " ";
            underscoreString += "_ ";
        }
    }
}


function guessLetter(letter) {
    if (artist.indexOf(letter) !== -1) {
        for (var i = 0; i < artistLongString.length; i++) {
            if (artistLongString[i] === letter) {
                underscoreString = ReplaceCharacter(underscoreString, i, letter);
            }
        }
        var guess = document.getElementById("guesses");
        guess.innerText = underscoreString;
        if (artistLongString === underscoreString) {
            gameIsRunning = false;
            displayEndResults(artist);
        }
    }
    else {
        var wrongGuesses = document.getElementById("wrong-guesses");
        if (wrongGuesses.innerText.indexOf(letter) === -1) {

            wrongGuesses.innerText = wrongGuesses.innerText + " " + letter;
            var guessesRemaining = document.getElementById("guesses-remaining");
            var guessRemainingInt = parseInt(guessesRemaining.innerText); 
            guessesRemaining.innerText = --guessRemainingInt;
            if (guessRemainingInt === 0)
            {
                gameIsRunning = false;
                displayLossResults();
            }
        }

    }
}


function ReplaceCharacter(string, index, char) {
    if (index > string.length - 1) return str;
    return string.substr(0, index) + char + string.substr(index + 1);
}

function displayEndResults(artist) {
    var artistName = document.getElementById("artist-caption");
    artistName.innerText = "It's " + artist + " ! ";
    var artistImage = document.getElementById("artist-image"); 
    artistImage.src = "assets/images/" + artist + ".jpg";
    var wins = document.getElementById("win-count");
    wins.innerText = "Wins: " + ++winCount; 
    
    var youtube = document.getElementById("youtube");
    youtube.style.display = "block";
    var video = document.getElementById("iframe-id");
    video.src = "https://www.youtube.com/embed/" + youtubeTags[artist] + "?start=60&autoplay=1";

}

function displayLossResults() {
    var artistName = document.getElementById("artist-caption");
    artistName.innerHTML = "YOU LOSE! NO MORE GUESSES REMAINING. <br> PRESS START GAME TO PLAY AGAIN " ;
     
}


document.onkeyup = function (event) {
    //check if game is running
    if(gameIsRunning) 
    {
        var userGuess = event.key.toUpperCase();
        var charCode = userGuess.charCodeAt(0);
    
        if (charCode > 64 && charCode < 91)
        {
            guessLetter(userGuess);
        }
        else 
        {
            var wrongInput = document.getElementById("wrong-input");
            wrongInput.innerText = userGuess + " is not a valid letter. Use only A~Z to Guess!"
        }

    }
};
