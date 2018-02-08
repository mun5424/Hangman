

var artists = ["KENDRICK LAMAR", "DRAKE", "JAYZ", "CARDI B", "ASAP ROCKY", "KANYE WEST", "MEEK MILL", "MIKE JONES", "CHRIS BROWN", "BUSTA RHYMES", "LIL WAYNE", "EMINEM", "SNOOP DOGG", "LUDACRIS", "DRDRE", "NAS", "NICKI MINAJ", "TUPAC SHAKUR", "TYGA"];
var winCount = 0;

var artist = "";
var artistLongString = "";
var underscoreString = "";
var gameIsRunning = false;



//function RunGame() {
// get next artist name
function RunGame() {
    gameIsRunning = true; 
    var container = document.getElementsByClassName("container-content"); 
    container[0].style.display = "block";
    artist = artists[Math.floor(Math.random() * artists.length)];
    var remainingGuesses = 10;
    hangmanString(artist);
    var guess = document.getElementById("guesses");
    guess.innerHTML = underscoreString; 
}


//}

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
    var wins = document.getElementById("win-count");
    wins.innerText = "Wins: " + ++winCount; 
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

    }
};
