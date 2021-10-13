
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

let clock = () => {
	let date = new Date();
	let hrs = date.getHours();
	let mins = date.getMinutes();
	let secs = date.getSeconds();
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
	setTimeout(clock, 1000);
};

clock();

export {
	time as time
};

//button dissapear on click
const startBtn = document.getElementById('btn');

function btnHide() {
	startBtn.style.display = "none";

}

startBtn.addEventListener("click", btnHide);


//show three other button
let playTime = () => {
	let getObj = localStorage.getItem('monster');
	let parseJSON = JSON.parse(getObj);
	let svgHTML = document.getElementById('eyes');
	if (parseJSON.moodHappy == !true) {
		svgHTML.innerHTML = '<path d="M16 9L9 2L2 9" stroke="black" stroke-width="4" stroke-miterlimit="1" stroke-linecap="round" stroke-linejoin="round"/>';
	} else {
		svgHTML.innerHTML = '<path d="M5.5 10C7.98528 10 10 7.98528 10 5.5C10 3.01472 7.98528 1 5.5 1C3.01472 1 1 3.01472 1 5.5C1 7.98528 3.01472 10 5.5 10Z" fill="black" stroke="black" stroke-width="2" stroke-miterlimit="1" stroke-linecap="round" stroke-linejoin="round"/>';
	}
}
playTime();
