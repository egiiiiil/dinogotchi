
//change background image depending on the time

var currentTime = new Date().getHours();
if (document.body) {
	if (7 <= currentTime && currentTime < 20) {
		document.body.style.background = "yellow";
	} else {
		document.body.style.background = "blue";
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


const startBtn = document.getElementById('btn');
const mainTag = document.getElementsByTagName('main')[0];

startBtn.addEventListener("click", function btnHide(){
	startBtn.style.display = "none";

  const feedBtn = document.createElement("button");
  feedBtn.classList.add("feed___btn");
  feedBtn.innerHTML="FEED";

  const playBtn = document.createElement("button");
  playBtn.classList.add("play___btn");
  playBtn.innerHTML= "PLAY";

  const petBtn = document.createElement("button");
  petBtn.classList.add("pet___btn");
  petBtn.innerHTML="PET";

  mainTag.appendChild(feedBtn);
  mainTag.appendChild(playBtn);
  mainTag.appendChild(petBtn);
  
});


//show three other button

