// Generate random number between 1 and 100
const generateWinningNumber = () => Math.floor(Math.random() * 100 + 1);

const shuffle = array => {
  let m = array.length,
    t,
    i;
  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);
    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
};

class Game {
  constructor() {
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber();
  }
}
// Add Game prototypes
Game.prototype.difference = function() {
  return Math.abs(this.playersGuess - this.winningNumber);
};
Game.prototype.isLower = function() {
  return this.playersGuess < this.winningNumber
    ? 'Guess higher!'
    : 'Guess lower!';
};
Game.prototype.playersGuessSubmission = function(guess) {
  if (isNaN(guess) || guess < 1 || guess > 100) {
    return 'That is an invalid guess.';
  }
  this.playersGuess = guess;
  return this.checkGuess();
};
Game.prototype.checkGuess = function() {
  if (this.playersGuess === this.winningNumber) {
    return `You got it! The winning number was ${this.winningNumber}.`;
  } else if (this.pastGuesses.includes(this.playersGuess)) {
    return 'You have already guessed that number.';
  } else {
    this.pastGuesses.push(this.playersGuess);
    document.querySelector(
      'li:nth-child(' + this.pastGuesses.length + ')'
    ).innerHTML = this.playersGuess;
  }
  if (this.pastGuesses.length === 5)
    return 'Sorry! Click Play Again for another round.';
  const diff = this.difference();
  if (diff < 10) return "You're burning up! " + this.isLower();
  if (diff < 25) return "You're lukewarm. " + this.isLower();
  if (diff < 50) return "You're a bit chilly. " + this.isLower();
  if (diff < 100) return "You're ice cold! " + this.isLower();
};
Game.prototype.provideHint = function() {
  let hintArray = [
    this.winningNumber,
    generateWinningNumber(),
    generateWinningNumber(),
  ];
  return shuffle(hintArray);
};

const newGame = () => new Game();

let game = newGame();

let button = document.getElementById('submit-btn');
let reset = document.getElementById('reset-btn');
let hint = document.getElementById('hint-btn');
let message = document.getElementById('msg');

function getInputAndUpdate(inputElement) {
  const guess = parseInt(inputElement.value, 10);
  inputElement.value = '';
  return game.playersGuessSubmission(guess);
}

// Event Listeners
button.addEventListener('click', function() {
  const inputElement = document.querySelector('input');
  message.textContent = getInputAndUpdate(inputElement);
});

hint.addEventListener('click', function() {
  const hints = game.provideHint();
  message.textContent = `The winning number is either ${hints[0]}, ${
    hints[1]
  } or ${hints[2]}.`;
});

reset.addEventListener('click', function() {
  game = newGame();
  message.textContent = 'Pick a number between 1 and 100.';
  document.querySelector('ul').innerHTML =
    '<li class="guess"></li><li class="guess"></li><li class="guess"></li><li class="guess"></li><li class="guess"></li>';
});
