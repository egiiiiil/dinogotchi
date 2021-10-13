//change background image depending on the time

var currentTime = new Date().getHours();
if (document.body) {
	if (7 <= currentTime && currentTime < 20) {
		document.body.background = "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2832&q=80";
	} else {
		document.body.background = "https://images.unsplash.com/photo-1488866022504-f2584929ca5f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1762&q=80";
	}
}

let time
let mins
let secs
let date
let epochCurrentTime

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
	console.log(epochCurrentTime);
	setTimeout(clock, 1000);

}
clock();

// export {
// 	time as time
// };

//button dissapear on click
const startBtn = document.getElementById('btn');

function btnHide() {
	startBtn.style.display = "none";

	setStartDate();
	calculateCurrentPlayTime();

}

startBtn.addEventListener("click", btnHide);



const monster = {
	startDate: '',
	endDate: '',
	currentTime: time,
	aliveTime: '',
	neededSleep: 8,
	actualSleep: '',
	neededFood: 4,
	currentFood: 4,
	neededPlayTime: 2, //two clicks
	currentPlayTime: '',
	moodHappy: true,
}

localStorage.setItem("monster", JSON.stringify(monster));

console.log(time);


let epochGameStartTime
//connecting start time of the game to startDate and sending it to local storage
function setStartDate() {
	let gameStartDate = new Date();
	monster.startDate = gameStartDate;


	epochGameStartTime = gameStartDate.getTime()

	console.log(epochGameStartTime, "poop")

	localStorage.setItem("monster", JSON.stringify(monster));
}

function calculateCurrentPlayTime() {
	monster.currentPlayTime = epochCurrentTime - epochGameStartTime;
	console.log(monster.currentPlayTime, "number");
	setTimeout(calculateCurrentPlayTime, 1000);
}
