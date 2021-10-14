//change background image depending on the time

var currentTime = new Date().getHours();
if (document.body) {
	if (7 <= currentTime && currentTime < 20) {
		document.body.style.background = 'url("../image/day.jpg")';
	} else {
		document.body.style.background = 'url("../image/night.jpg")';
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

	//Div which helps to wrap buttons and to define their position
	const divWrapper = document.createElement("div");
	divWrapper.id = "div__wrapper";

	const feedBtn = document.createElement("button");
	feedBtn.id = "btn__feed";
	feedBtn.innerHTML = "FEED";

	const playBtn = document.createElement("button");
	playBtn.id = "btn__play";
	playBtn.innerHTML = "PLAY";

	const petBtn = document.createElement("button");
	petBtn.id = "btn__pet";
	petBtn.innerHTML = "PET";
	mainTag.appendChild(divWrapper);

	divWrapper.appendChild(feedBtn);
	divWrapper.appendChild(playBtn);
	divWrapper.appendChild(petBtn);

  feedBtn.classList.add("btn__game");
  playBtn.classList.add("btn__game");
  petBtn.classList.add("btn__game");
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
	currentFood: 4,
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
	milliseconds = epochCurrentTime - epochGameStartTime;
	monster.currentPlayTime = formatPlayTime(milliseconds);
	setTimeout(calculateCurrentPlayTime, 1000);
	localStorage.setItem("monster", JSON.stringify(monster));
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
