
var artists = ["Kendrick Lamar", "Drake", "JayZ", "Cardi B", "ASAP ROCKY", "Kanye West", "Meek Mill", "Mike Jones", "Chris Brown", "Busta Rhymes", "Lil Wayne", "Eninem", "Snoop Dogg", "Ludacris", "DrDre", "Nas", "Nicki Minaj", "Tupac Shakur"];


function hangmanString(name) {
    output = "";
    for (var i = 0; i < name.length; i++) {
        output += name[i] + " ";
    }
}

var nextProblem = artists[Math.floor(Math.random() * artists.length)];

var answer = document.getelementbyid("answer");
answer.innerHTML = "FUCK"; 