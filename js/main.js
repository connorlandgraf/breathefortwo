var timeToStart = 2;
var mins = 2;
var secs = 0;
var displaysecs;
var started = 0;
var audio = new Audio();

function start(){
	document.getElementById("start").style.visibility = "hidden";
	document.getElementById("subtext").style.visibility = "visible";
	var x = setInterval(function(){

		if (timeToStart >= 0){
			var html = document.getElementById("startcount").innerHTML = timeToStart;
			//console.log(timeToStart);

		}
		if (timeToStart == 0){
			startBreatheExercise();
		}

		timeToStart = timeToStart - 1;

	}, 1000);
}

function switchAudio(clip){
	audio.pause();
	audio = new Audio('audio/'+clip+'.mp3');
	audio.play();
}

function startBreatheExercise(){
	started = 1;
	//console.log('starting breath exercise');
	//play music
	audio = new Audio('audio/waves.mp3');
	audio.play();


	document.getElementById("timer").style.display = "block";
	document.getElementById("subtext").style.display = "none";
	document.getElementById("header").style.display = "none";

	var y = setInterval(function(){

		if (secs == 0 && mins >0){
			mins = mins-1;
			secs = 59;
		}


		if (mins <= 0 && secs <= 0){
			updateTimerUi(secs, mins);
			document.getElementById("finished").style.visibility = "visible";
			//console.log('finished');
			audio.pause();
			return;
		}

		updateTimerUi(secs, mins);
		//console.log('time ' + mins + ":" + secs);

		secs = secs - 1;

	}, 1000);
};

document.onmousemove = function(){
	if (started == 1){
		//console.log('moved mouse');
		resetBreatheExercise();		
	}
}

window.addEventListener(
      "keydown",
      function(event) {resetBreatheExercise();}
)


function updateTimerUi(secs, mins){

		if (mins >= 0 && secs >= 0){
			var html = document.getElementById("mins").innerHTML = mins;
			if(secs == 0){
				displaysecs = "00";
			}
			else if(secs < 10){
				displaysecs = "0" + secs;
			}
			else{
				displaysecs = secs;
			};
			var html = document.getElementById("secs").innerHTML = displaysecs;

		}

	return displaysecs;
}

function resetBreatheExercise(){
	mins = 2;
	secs = 0;
	updateTimerUi(secs, mins);

	var elem = document.getElementById("subtextalert");
	elem.style.webkitAnimation = 'none';
  	elem.offsetHeight; /* trigger reflow */
  	elem.style.animation = null; 
	elem.classList.remove("fadeout");
	elem.classList.add("fadeout");

}


