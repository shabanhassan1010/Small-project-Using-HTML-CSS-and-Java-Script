'use strict';


// DOM Elements
const number = document.querySelector('.number');
const guessInput = document.querySelector('.guess');
const message = document.querySelector('.message');
const scoreElement = document.querySelector('.score');
const highscoreElement = document.querySelector('.highscore');
const checkButton = document.querySelector('.check');
const againButton = document.getElementById('again');

// Game State
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

// Functions
const displayMessage = (msg, color) => {
    message.textContent = msg;
    message.style.color = color;
};

const updateScore = () => {
    scoreElement.textContent = score;
};

const updateHighscore = () => {
    if (score > highscore) {
        highscore = score;
        highscoreElement.textContent = highscore;
    }
};

const resetGame = () => {
    score = 20;
    secretNumber = Math.trunc(Math.random() * 20) + 1;
    number.textContent = '?';
    guessInput.value = '';
    displayMessage('Start guessing...');
    updateScore();
    document.body.style.background = '#222';
};

const checkGuess = () => {
    const guess = Number(guessInput.value);

    if (!guess) {
        displayMessage('No Number Added', 'red');
    } else if (guess === secretNumber) {
        displayMessage('Correct! 🎉', 'green');
        document.body.style.background = 'green';
        number.textContent = secretNumber;
        updateHighscore();
    } else {
        if (score > 1) {
            displayMessage(guess > secretNumber ? 'Too High!' : 'Too Low!', 'red');
            score--;
            updateScore();
        } else {
            displayMessage('You lose The Game', 'white');
            scoreElement.textContent = 0;
            document.body.style.background = 'red';
        }
    }
};

// Event Listeners
checkButton.addEventListener('click', checkGuess);
againButton.addEventListener('click', resetGame);

// Initialize Game
resetGame();