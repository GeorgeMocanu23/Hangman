let correctGuesses = 0;
let incorrectGuesses = 0;
const words = ["WELLCODE", "HANGMAN", "PROGRAMMING", "JAVASCRIPT", "SOFTWARE", "PYTHON", "HACKING", "MATHEMATICS", "OPTIMIZATION"]; // Lista de cuvinte posibile
let chosenWord = words[Math.floor(Math.random() * words.length)];
let guessedLetters = [];
const maxIncorrectGuesses = 7;
const wordBlanks = document.getElementById("word-blanks");
const hangmanDiagram = document.getElementById("hangman-diagram");

function startGame() {
    document.getElementById("game-board").style.display = "block";
    document.getElementById("win-message").style.display = "none";
    document.getElementById("lost-message").style.display = "none";
    displayWordBlanks(chosenWord);
    displayHangmanDiagram(incorrectGuesses);
}

function addLetter(letter) {
    if (!guessedLetters.includes(letter)) {
        guessedLetters.push(letter);
        const correctLetters = chosenWord.split('').filter((l) => guessedLetters.includes(l)).length;
    if (correctLetters === chosenWord.length) {
        correctGuesses = correctLetters;
        displayWordBlanks(incorrectGuesses);
        checkGameStatus(correctGuesses, incorrectGuesses, chosenWord);
    } else if (chosenWord.includes(letter)) {
        displayWordBlanks(correctGuesses);
    } else {
        ++incorrectGuesses;
        displayHangmanDiagram(incorrectGuesses);
        checkGameStatus(correctGuesses, incorrectGuesses, chosenWord);
    }
  }
}

function displayWordBlanks() {
    let display = "";
    for (let i = 0; i < chosenWord.length; ++i) {
        if (guessedLetters.includes(chosenWord[i])) {
            display += chosenWord[i];
        } else {
            display += "_ ";
        }
    }
    wordBlanks.textContent = display;
}

function displayHangmanDiagram() {
    if (incorrectGuesses === 0) {
        hangmanDiagram.innerHTML = "";
    } else if (incorrectGuesses === 1) {
        hangmanDiagram.innerHTML = "O<br>";
    } else if (incorrectGuesses === 2) {
        hangmanDiagram.innerHTML = "O<br>/";
    } else if (incorrectGuesses === 3) {
        hangmanDiagram.innerHTML = "O<br>/|";
    } else if (incorrectGuesses === 4) {
        hangmanDiagram.innerHTML = "O<br>/|\\<br>";
    } else if (incorrectGuesses === 5) {
        hangmanDiagram.innerHTML = "O<br>/|\\<br>|<br>";
    } else if (incorrectGuesses === 6) {
        hangmanDiagram.innerHTML = "O<br>/|\\<br>|<br>/ <br>";
    } else if (incorrectGuesses === 7) {
        hangmanDiagram.innerHTML = "O<br>/|\\<br>|<br>/ \\";
        document.getElementById("lost-message").style.display = "block";
    }
    document.getElementById("incorrect-guesses").innerHTML = "Incorrect guesses: " + incorrectGuesses;
}

function checkGameStatus(correctGuesses, incorrectGuesses, chosenWord) {
    if (correctGuesses === chosenWord.length) {
        document.getElementById("game-board").style.display = "none";
        document.getElementById("win-message").style.display = "block";
        document.getElementById("guessed-word").innerHTML += "The word was " + chosenWord + ".";
    } else if (incorrectGuesses === maxIncorrectGuesses) {
        document.getElementById("game-board").style.display = "none";
        document.getElementById("lost-message").style.display = "block";
        document.getElementById("not-guessed-word").innerHTML += "The word was " + chosenWord + ".";
    }
}

document.addEventListener("keyup", function(event) {
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        addLetter(event.key.toUpperCase());
    }
});
