let currentTime = 0;
let interval;

function startTimer(){

const workTime =
parseInt(document.getElementById("workTime").value);

const restTime =
parseInt(document.getElementById("restTime").value);

const sets =
parseInt(document.getElementById("sets").value);

const cycles =
parseInt(document.getElementById("cycles").value);

const cycleRest =
parseInt(document.getElementById("cycleRest").value);

let currentCycle = 1;
let currentSet = 1;
let working = true;

runPhase(workTime);

function runPhase(duration){

clearInterval(interval);

currentTime = duration;

updateTimer();

interval = setInterval(() => {

currentTime--;

updateTimer();

if(currentTime <= 0){

clearInterval(interval);

if(working){

working = false;

document.body.className="rest";

document.getElementById("phase").innerText =
"RÉCUPÉRATION";

speak("Récupération");

runPhase(restTime);

}else{

working = true;

currentSet++;

if(currentSet > sets){

currentCycle++;

if(currentCycle > cycles){

finishSession();
return;
}

document.body.className="cycle-rest";

document.getElementById("phase").innerText =
"PAUSE";

speak("Pause entre les cycles");

setTimeout(()=>{

currentSet=1;

document.body.className="work";

document.getElementById("phase").innerText =
"TRAVAIL";

runPhase(workTime);

},cycleRest*1000);

return;
}

document.body.className="work";

document.getElementById("phase").innerText =
"TRAVAIL";

speak("Travail");

runPhase(workTime);
}

updateStatus();
}

},1000);
}

function updateStatus(){

document.getElementById("status").innerText =
"Série " + currentSet +
" | Cycle " + currentCycle;
}

updateStatus();

document.body.className="work";

document.getElementById("phase").innerText =
"TRAVAIL";

}

function updateTimer(){

const minutes =
Math.floor(currentTime/60);

const seconds =
currentTime%60;

document.getElementById("timer").innerText =
String(minutes).padStart(2,'0')
+ ":" +
String(seconds).padStart(2,'0');
}

function finishSession(){

document.body.className="finished";

document.getElementById("phase").innerText =
"TERMINÉ";

document.getElementById("timer").innerText =
"00:00";

speak("Séance terminée");
}

function speak(text){

let utterance =
new SpeechSynthesisUtterance(text);

utterance.lang="fr-FR";

speechSynthesis.speak(utterance);
}

function toggleFullscreen(){

if(!document.fullscreenElement){

document.documentElement.requestFullscreen();

}else{

document.exitFullscreen();
}
}
