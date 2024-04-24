'use strict';

// calling the Score elements
const crtPlayer1Score = document.querySelector('#current--0');
const player1Score = document.querySelector('#score--0');
const crtPlayer2Score = document.querySelector('#current--1');
const player2Score = document.querySelector('#score--1');
// calling the player elements
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
// calling the button elements
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
// calling the dice image element
const diceImg = document.querySelector('.dice');
// Other variables
let scores, activePlayer, currentScore, playing;

// function to initialize the game
const init = function () {
  // reset the scores
  scores = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  playing = true;

  // hidde the dice image
  diceImg.classList.add('hidden');

  // Reset the visual numbers
  crtPlayer1Score.textContent = 0;
  player1Score.textContent = 0;
  crtPlayer2Score.textContent = 0;
  player2Score.textContent = 0;

  // Reset the texts
  document.getElementById(`name--0`).textContent = `Player 1`;
  document.getElementById(`name--1`).textContent = `Player 2`;
  // Reset the Active player Class
  player1.classList.add('player--active');
  player2.classList.remove('player--active');
};
init();

// function to switch the active player
const switchPlayers = function () {
  // reset the current score
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;

  // switch players
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
};

// function to roll a random dice
const rollDice = function () {
  if (playing) {
    // roll a random dice value
    const diceValue = Math.trunc(Math.random() * 6 + 1);

    // changes the image with the dice number
    diceImg.src = `dice-${diceValue}.png`;
    diceImg.classList.remove('hidden');

    // check if dice is different than 1
    if (diceValue !== 1) {
      currentScore += diceValue;

      // Add to the Current score of the active player
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayers();
    }
  }
};

const addCurrentScr = function () {
  // add current score to total score
  scores[activePlayer] += currentScore;

  // update the total score text
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  // hidde the dice again
  diceImg.classList.add('hidden');

  // check if player wins
  if (scores[activePlayer] >= 100) {
    document.getElementById(`name--${activePlayer}`).textContent = `Player ${
      activePlayer + 1
    } Won the game!`;
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
    playing = false;
  } else {
    switchPlayers();
  }
};

btnRoll.addEventListener('click', rollDice);

btnHold.addEventListener('click', addCurrentScr);

btnNew.addEventListener('click', init);
