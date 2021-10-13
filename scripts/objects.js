import {
	time
} from "./script.js";

const monster = {
	startDate: '',
	endDate: '',
	currentTime: time,
	aliveTime: '',
	neededSleep: 8,
	actualSleep: '',
	neededFood: 4,
	currentFood: '',
	neededPlayTime: 2, //two clicks
	currentPlayTime: '',
	moodHappy: true,
}

localStorage.setItem("monster", JSON.stringify(monster));

console.log(time);
