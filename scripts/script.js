const maxFood = 10;

//change background image depending on the time
var currentTime = new Date().getHours();
if (document.body) {
	if (7 <= currentTime && currentTime < 20) {
		document.body.style.backgroundColor = "#ffed48";
	} else {
		document.body.style.backgroundColor = "#4c48ff";
	}
}

// declared outside of clock function bc we wanted to use them in another functions too
let time;
let mins;
let secs;
let date;
let epochCurrentTime;

//function displaying on the screen current time
let clock = () => {
	date = new Date();
	let hrs = date.getHours();
	mins = date.getMinutes();
	secs = date.getSeconds();
	let period = "AM";

	if (hrs == 0) {
		hrs = 12;
	} else if (hrs >= 12) {
		hrs = hrs - 12;
		period = "PM";
	}

	hrs = hrs < 10 ? "0" + hrs : hrs;
	mins = mins < 10 ? "0" + mins : mins;
	secs = secs < 10 ? "0" + secs : secs;

	time = `${hrs}:${mins}:${secs}:${period}`;
	document.getElementById("clock").innerText = time;
	epochCurrentTime = date.getTime();
	setTimeout(clock, 1000);
};
clock();

//==========MONSTER TALK START
const monsterPhrases = [
	//If ready (on page load)
	["Let's play!", "Start the game already!", "Press that button!"],
	//If start (after the game started)
	["Let's see...", "What do we got here?", "What's going on?"],
	//If happy
	[
		"I'm so happy right now!",
		"I like this game!",
		"It's fun to play with you!",
	],
	//If angry
	["I'm so hungry!", "Give me that food!", "I'm starving!"],
	//If dead
	["Well, too late now...", "Okay, now I'm dead.", "Goodbye cruel world..."],
	//If fed (on click feed button)
	["Tastes good!", "*crunches food*", "Thank you!"],
];

const numberOfPhrases = 3;
function getRandomNumber(numberOfPhrases) {
	return Math.floor(Math.random() * numberOfPhrases);
}

function monsterSays(monsterStatus) {
	const monsterSpeech = document.getElementById("monsterSpeech");
	let phraseNumber;

	if (monsterStatus === "ready") {
		phraseNumber = getRandomNumber(numberOfPhrases);
		monsterSpeech.innerHTML = monsterPhrases[0][phraseNumber];
	} else if (monsterStatus === "start") {
		phraseNumber = getRandomNumber(numberOfPhrases);
		monsterSpeech.innerHTML = monsterPhrases[1][phraseNumber];
	} else if (monsterStatus === "happy") {
		phraseNumber = getRandomNumber(numberOfPhrases);
		monsterSpeech.innerHTML = monsterPhrases[2][phraseNumber];
	} else if (monsterStatus === "angry") {
		phraseNumber = getRandomNumber(numberOfPhrases);
		monsterSpeech.innerHTML = monsterPhrases[3][phraseNumber];
	} else if (monsterStatus === "dead") {
		phraseNumber = getRandomNumber(numberOfPhrases);
		monsterSpeech.innerHTML = monsterPhrases[4][phraseNumber];
	} else if (monsterStatus === "fed") {
		phraseNumber = getRandomNumber(numberOfPhrases);
		monsterSpeech.innerHTML = monsterPhrases[5][phraseNumber];
	}
}

//==========MONSTER TALK END

// BUTTONS***********************************************
const startBtn = document.getElementById("btn");
//TODO mainTag is never used
const mainTag = document.getElementsByTagName("main")[0];
const monsterPicture = document.querySelector(".image-wrapper");

//TODO remove btnWrapper bc we have it inside the function createAndShowGameButtons

// Select the wrapper to put buttons in
const btnWrapper = document.querySelector(".button-wrapper");

function hideStartButton() {
	startBtn.style.display = "none";
}
function hideBtn(btnName) {
	let btn = document.querySelector(btnName);
	if (btn) {
		btn.style.display = "none";
	}
}

function showStartButton() {
	startBtn.style.display = "block";
}

function createAndShowGameButtons() {
	// Select the wrapper to put buttons in
	const btnWrapper = document.querySelector(".button-wrapper");

	//feed btn
	let feedBtn = document.getElementById("btn__feed");
	if (!feedBtn) {
		feedBtn = createBtn("btn__feed", "FEED", "btn__game");
		feedBtn.addEventListener("click", feedBtnF);
		btnWrapper.append(feedBtn);
	} else {
		feedBtn.style.display = "block";
	}

	console.log(monster.currentFood);

	//Food bar
	let foodBar = document.getElementsByClassName("foodBar")[0];
	if (!foodBar) {
		let foodBar = CreateBar(
			monster.currentFood,
			"foodBar",
			"Food",
			"bar-wrapper"
		);
		monsterPicture.append(foodBar);
	} else {
		foodBar.style.display = "block";
		foodBar.setAttribute("value", monster.currentFood.toString());
	}
}

function startGame() {
	hideBtn("#btn__reset");
	//when start game button is clicked run these functions
	hideStartButton();
	createMonsterObject();
	// hungerEyes();
	createAndShowGameButtons();
	setStartDate();
	calculateCurrentPlayTime();
	updateCurrentTime();
	hungerInterval();
}

function continueGame() {
	hideStartButton();
	createAndShowGameButtons();
	// hungerEyes();

	//This updateCurrentTime() breaks logic
	// updateCurrentTime();
	if (monster.currentFood > 0) {
		hungerInterval();
	}
}

startBtn.addEventListener("click", startGame);

let monster = {};

function checkForMonsterObject() {
	monster = JSON.parse(localStorage.getItem("monster"));
	if (monster) {
		console.log(monster);
		console.log("something");
		if (monster.currentFood > 0) {
			continueGame();
		} else {
			resetBtnF();
			hungerEyes();
		}
	} else {
		showStartButton();

		console.log("nothing");
	}
}

checkForMonsterObject();

function createMonsterObject() {
	//monster object
	monster = {
		startDate: "",
		endDate: "",
		currentTime: "",
		aliveTime: "",
		neededSleep: 8,
		actualSleep: "",
		neededFood: 4,
		currentFood: 10,
		maxFood: 10,
		neededPlayTime: 2, //two clicks
		currentPlayTime: "",
		moodHappy: true,
	};

	//push monster object to local storage
	localStorage.setItem("monster", JSON.stringify(monster));
}

//function updating current time in monster object(3rd key)
function updateCurrentTime() {
	monster.currentTime = time;
	//updating every second
	setTimeout(updateCurrentTime, 1000);
	//pushing into local storage
	localStorage.setItem("monster", JSON.stringify(monster));
}

//Epoch time = milliseconds that have passed since midnight on January 1st, 1970
let epochGameStartTime;

//connecting start time of the game to startDate and sending it to local storage
function setStartDate() {
	let gameStartDate = new Date();
	monster.startDate = gameStartDate;

	//assigning milliseconds passed since January 1st 1970 to epochGameStartTime
	epochGameStartTime = gameStartDate.getTime();

	localStorage.setItem("monster", JSON.stringify(monster));
}

//this variable will be assigned to actual millisecods of play time (difference between epochCurrentTime and epochGameStartTime)
let milliseconds;

function calculateCurrentPlayTime() {
	milliseconds = Date.now() - epochGameStartTime;
	monster.currentPlayTime = formatPlayTime(milliseconds);
	setTimeout(calculateCurrentPlayTime, 1000);
	localStorage.setItem("monster", JSON.stringify(monster));
	// console.log(monster.currentPlayTime);
}

//reformatting currentPlayTime to mins:sec instead of milliseconds
function formatPlayTime(milliseconds) {
	var minutes = Math.floor(milliseconds / 60000);
	var seconds = ((milliseconds % 60000) / 1000).toFixed(0);

	//returning minutes : seconds format, if seconds is less than 10 display '0' else display empty string '', plus seconds
	return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

let getObj = localStorage.getItem("monster");
let parseJSON = JSON.parse(getObj);
let svgHTML = document.getElementById("eyes");

let playTime = () => {
	if (parseJSON.moodHappy == true) {
		svgHTML.innerHTML =
			'<path d="M16 9L9 2L2 9" stroke="black" stroke-width="4" stroke-miterlimit="1" stroke-linecap="round" stroke-linejoin="round"/>';
	} else {
		svgHTML.innerHTML =
			'<path d="M5.5 10C7.98528 10 10 7.98528 10 5.5C10 3.01472 7.98528 1 5.5 1C3.01472 1 1 3.01472 1 5.5C1 7.98528 3.01472 10 5.5 10Z" fill="black" stroke="black" stroke-width="2" stroke-miterlimit="1" stroke-linecap="round" stroke-linejoin="round"/>';
	}
};

function createBtn(btnId, btnText, btnClass) {
	let btn = document.createElement("button");
	btn.id = btnId;
	btn.innerHTML = btnText;
	btn.classList.add(btnClass);
	return btn;
}

function feedBtnF() {
	if (monster.currentFood < maxFood) {
		monster.currentFood++;
		localStorage.setItem("monster", JSON.stringify(monster));
		document.getElementsByClassName("foodBar")[0].value = monster.currentFood;
	}
}

function resetBtnF() {
	hideBtn("#btn__feed");
	hideBtn("#btn");
	let resetBtn = document.getElementById("btn__reset");

	if (!resetBtn) {
		resetBtn = createBtn("btn__reset", "RESET", "btn__game");
		btnWrapper.append(resetBtn);
		resetBtn.addEventListener("click", startGame);
	} else {
		resetBtn.style.display = "block";
	}
}

function hungerInterval() {
	setTimeout(function timer() {
		monster.currentFood--;
		document.getElementsByClassName("foodBar")[0].value = monster.currentFood;
		localStorage.setItem("monster", JSON.stringify(monster));
		console.log(monster.currentFood);
		hungerEyes();

		if (monster.currentFood > 0) {
			hungerInterval();
		}

		if (monster.currentFood == 0) {
			resetBtnF();
		}
	}, 1000);
}

function hungerEyes() {
	let currentFood = monster.currentFood;

	let svgHTML = document.getElementById("eyes");
	if (currentFood === 0) {
		console.log("dead");

		monsterSays("dead");

		svgHTML.innerHTML = `<path fill-rule="evenodd" clip-rule="evenodd" d="M52.4385 25L61.4385 34L52.4385 25Z" stroke="black" stroke-width="4" stroke-miterlimit="1" stroke-linecap="round" stroke-linejoin="round"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M61 25L52 34L61 25Z" stroke="black" stroke-width="4" stroke-miterlimit="1" stroke-linecap="round" stroke-linejoin="round"/>`;
	} else if (currentFood < 4 && currentFood >= 1) {
		console.log("angry");

		monsterSays("angry");

		svgHTML.innerHTML = `<path d="M56.5 34C58.9853 34 61 31.9853 61 29.5C61 27.0147 58.9853 25 56.5 25C54.0147 25 52 27.0147 52 29.5C52 31.9853 54.0147 34 56.5 34Z" fill="black" stroke="black" stroke-width="2" stroke-miterlimit="1" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M60 18L46 25" stroke="black" stroke-width="4" stroke-miterlimit="1" stroke-linecap="round" stroke-linejoin="round"/>`;
	} else if (currentFood >= 4) {
		console.log("happy");

		monsterSays("happy");
		svgHTML.innerHTML =
			'<path d="M64 33L57 26L50 33" stroke="black" stroke-width="4" stroke-miterlimit="1" stroke-linecap="round" stroke-linejoin="round"/>';
	}
}

// FOOD BAR

function CreateBar(objectValue, className, text, divClassName) {
	//div-wrapper
	let div = document.createElement("div");
	div.classList.add(divClassName);
	// Create a label
	let label = document.createElement("label");
	label.setAttribute("for", className);
	label.classList.add(className + "Label");
	label.innerHTML = text;
	// create a meter
	let variable = document.createElement("meter");
	variable.setAttribute("min", "0");
	variable.setAttribute("max", maxFood.toString());
	variable.setAttribute("value", objectValue.toString());
	variable.classList.add(className);
	div.append(label);
	div.append(variable);
	return div;
}
