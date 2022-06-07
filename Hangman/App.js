var programming_languages = [
"python",
"javascript",
"java",
"html",
"css",
"c",
"csharp",
"cpp",
"sql",
"ruby",
"assembly"
]

let answer = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;

function randomWord() {
	answer= programming_languages[Math.floor(Math.random() * programming_languages.length)];
}

function generateButtons() {
  let buttonsHTML = "abcdefghijklmnopqrstuvwxyz".split("").map(letter =>
    `
      <button
        class="btn btn-lg btn-primary m-2"
        id='` + letter + `'
        onClick="handleGuess('` + letter + `')"
      >
        ` + letter + `
      </button>
    `).join('');

  document.getElementById('keyboard').innerHTML = buttonsHTML;
}

function handleGuess(chosenLetter) {
	guessed.indexOf(chosenLetter) == -1 ? guessed.push(chosenLetter) : null;	//repetitive 
	document.getElementById(chosenLetter).setAttribute('disabled', true);		//repetitive

	if (answer.indexOf(chosenLetter) >= 0) {
		guessedWord();
		winCheck();
	}
	else {
		mistakes++;
		updateMistakes();
		loseCheck();
		updateHangmanPicture();
	}
}

function updateHangmanPicture() {
	document.getElementById('hangmanPic').src="img/" + mistakes + ".jpg";
}

function winCheck() {
	if(wordStatus == answer) {
		document.getElementById('keyboard').innerText = "You won!!"
	}
}

function loseCheck() {
	if(mistakes == maxWrong) {
		document.getElementById('keyboard').innerText = "You lost!!\nAnswer: " + answer
	}
}

function updateMistakes() {
	document.getElementById('mistakes').innerText = mistakes;
}

function reset() {
	mistakes = 0;
	guessed = [];
	document.getElementById('hangmanPic').src = 'img/0.jpg';

	randomWord();
	guessedWord();
	updateMistakes();
	generateButtons();
}

function guessedWord() {
	wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : "_")).join('');

	document.getElementById('wordSpotlight').innerText = wordStatus;
}

document.getElementById('maxWrong').innerText = maxWrong;

randomWord();
generateButtons();
guessedWord();