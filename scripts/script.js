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
let time
let mins
let secs
let date
let epochCurrentTime


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

}
clock();

//*export in case if we'll use separate files*
// export {
// 	time as time
// };


// BUTTONS***********************************************
const startBtn = document.getElementById('btn');
const mainTag = document.getElementsByTagName('main')[0];


//show three other button
startBtn.addEventListener("click", function btnHide() {
	startBtn.style.display = "none";

	//when clicked run these functions
	setStartDate();
	calculateCurrentPlayTime();

	// Select the wrapper to put buttons in
	const btnWrapper = document.querySelector(".button-wrapper");

	const feedBtn = document.createElement("button");
	feedBtn.id = "btn__feed";
	feedBtn.innerHTML = "FEED";

	const playBtn = document.createElement("button");
	playBtn.id = "btn__play";
	playBtn.innerHTML = "PLAY";

	feedBtn.classList.add("btn__game");
	playBtn.classList.add("btn__game");

	btnWrapper.append(feedBtn);
	btnWrapper.append(playBtn);

	playBtn.addEventListener("click", playBtnF);
  hungerInterval();

});

//monster object
const monster = {
	startDate: '',
	endDate: '',
	currentTime: '',
	aliveTime: '',
	neededSleep: 8,
	actualSleep: '',
	neededFood: 4,
	currentFood: 8,
	neededPlayTime: 2, //two clicks
	currentPlayTime: '',
	moodHappy: true,
}

//push monster object to local storage
localStorage.setItem("monster", JSON.stringify(monster));

//function updating current time in monster object(3rd key)
function updateCurrentTime() {
	monster.currentTime = time;
	//updating every second
	setTimeout(updateCurrentTime, 1000);
	//pushing into local storage
	localStorage.setItem("monster", JSON.stringify(monster));
}
updateCurrentTime();

//Epoch time = milliseconds that have passed since midnight on January 1st, 1970
let epochGameStartTime

//connecting start time of the game to startDate and sending it to local storage
function setStartDate() {
	let gameStartDate = new Date();
	monster.startDate = gameStartDate;

	//assigning milliseconds passed since January 1st 1970 to epochGameStartTime
	epochGameStartTime = gameStartDate.getTime()

	localStorage.setItem("monster", JSON.stringify(monster));
}

//this variable will be assigned to actual millisecods of play time (difference between epochCurrentTime and epochGameStartTime)
let milliseconds

function calculateCurrentPlayTime() {
	milliseconds = Date.now() - epochGameStartTime;
	monster.currentPlayTime = formatPlayTime(milliseconds);
	setTimeout(calculateCurrentPlayTime, 1000);
	localStorage.setItem("monster", JSON.stringify(monster));
  console.log(monster.currentPlayTime);
}



//reformatting currentPlayTime to mins:sec instead of milliseconds
function formatPlayTime(milliseconds) {

	var minutes = Math.floor(milliseconds / 60000);
	var seconds = ((milliseconds % 60000) / 1000).toFixed(0);

	//returning minutes : seconds format, if seconds is less than 10 display '0' else display empty string '', plus seconds
	return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}


//issues:
//currentPlayTime starts as -1:-01 instead at 00:00
//some milliseconds delay between currentPlayTime and currentTime
//show three other button
let getObj = localStorage.getItem('monster');
let parseJSON = JSON.parse(getObj);
let svgHTML = document.getElementById('eyes');

let playTime = () => {
	if (parseJSON.moodHappy == !true) {
		svgHTML.innerHTML = '<path d="M16 9L9 2L2 9" stroke="black" stroke-width="4" stroke-miterlimit="1" stroke-linecap="round" stroke-linejoin="round"/>';
	} else {
		svgHTML.innerHTML = '<path d="M5.5 10C7.98528 10 10 7.98528 10 5.5C10 3.01472 7.98528 1 5.5 1C3.01472 1 1 3.01472 1 5.5C1 7.98528 3.01472 10 5.5 10Z" fill="black" stroke="black" stroke-width="2" stroke-miterlimit="1" stroke-linecap="round" stroke-linejoin="round"/>';
	}
}

// playTime();

function playBtnF() {
	// console.log("happy");
	// setTimeout(function(){
	//   console.log("sad");
	// }, 5000);
	svgHTML.innerHTML = '<path d="M16 9L9 2L2 9" stroke="black" stroke-width="4" stroke-miterlimit="1" stroke-linecap="round" stroke-linejoin="round"/>';
	setTimeout(function () {
		svgHTML.innerHTML = '<path d="M56.5 34C58.9853 34 61 31.9853 61 29.5C61 27.0147 58.9853 25 56.5 25C54.0147 25 52 27.0147 52 29.5C52 31.9853 54.0147 34 56.5 34Z" fill="black" stroke="black" stroke-width="2" stroke-miterlimit="1" stroke-linecap="round" stroke-linejoin="round"></path>';
	}, 3000);
}
// console.log(document.getElementById("btn__play"));



// Function to make the monster hungry over time
// TODO replace "3000" with the variable to be able to change it later

function hungerInterval() {
	let currentFood = monster.currentFood
	for (let i = currentFood; i > 0; i--) {
		setTimeout(function timer() {
			currentFood -= 1
			localStorage.setItem("monster", JSON.stringify(monster));
			monster.currentFood = currentFood
			console.log(currentFood)
			hungerEyes();

		}, i * 3000)
		//	the "i * 3000" makes it work with delay
	}
}

// hungerInterval()


let hungerEyes = () => {
	let currentFood = monster.currentFood;

	let svgHTML = document.getElementById('eyes');
	if (currentFood === 0) {
		console.log('dead');
		svgHTML.innerHTML = `<path fill-rule="evenodd" clip-rule="evenodd" d="M2.43854 2L11.4385 11L2.43854 2Z" stroke="black" stroke-width="4" stroke-miterlimit="1" stroke-linecap="round" stroke-linejoin="round"/>
		<path fill-rule="evenodd" clip-rule="evenodd" d="M11 2L2 11L11 2Z" stroke="black" stroke-width="4" stroke-miterlimit="1" stroke-linecap="round" stroke-linejoin="round"/>`
	} else if (currentFood < 4 && currentFood >= 1) {
		console.log('angry');
		svgHTML.innerHTML = `<path d="M12.5 18C14.9853 18 17 15.9853 17 13.5C17 11.0147 14.9853 9 12.5 9C10.0147 9 8 11.0147 8 13.5C8 15.9853 10.0147 18 12.5 18Z" fill="black" stroke="black" stroke-width="2" stroke-miterlimit="1" stroke-linecap="round" stroke-linejoin="round"/>
			<path d="M16 2L2 9" stroke="black" stroke-width="4" stroke-miterlimit="1" stroke-linecap="round" stroke-linejoin="round"/>`;
	} else if (currentFood >= 4) {
		console.log('happy');
		svgHTML.innerHTML = '<path d="M16 9L9 2L2 9" stroke="black" stroke-width="4" stroke-miterlimit="1" stroke-linecap="round" stroke-linejoin="round"/>';

	}
}
