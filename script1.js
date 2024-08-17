let startTime, updatedTime, difference;
let timerInterval;
let isRunning = false;
let lapTimes = [];

const display = document.getElementById('display');
const lapList = document.getElementById('lap-times');

function startStopwatch() {
    if (!isRunning) {
        startTime = Date.now() - (difference || 0);
        timerInterval = setInterval(updateTime, 10);
        isRunning = true;
    }
}

function pauseStopwatch() {
    if (isRunning) {
        clearInterval(timerInterval);
        difference = Date.now() - startTime;
        isRunning = false;
    }
}

function resetStopwatch() {
    clearInterval(timerInterval);
    display.innerHTML = '00:00:00';
    isRunning = false;
    difference = 0;
    lapTimes = [];
    lapList.innerHTML = '';
}

function updateTime() {
    updatedTime = Date.now() - startTime;
    let hours = Math.floor((updatedTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((updatedTime % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((updatedTime % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((updatedTime % 1000) / 10);

    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;
    milliseconds = (milliseconds < 10) ? '0' + milliseconds : milliseconds;

    display.innerHTML = `${hours}:${minutes}:${seconds}`;
}

function recordLap() {
    if (isRunning) {
        const lapTime = display.innerHTML;
        lapTimes.push(lapTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapTimes.length}: ${lapTime}`;
        lapList.appendChild(lapItem);
    }
}

document.getElementById('start').addEventListener('click', startStopwatch);
document.getElementById('pause').addEventListener('click', pauseStopwatch);
document.getElementById('reset').addEventListener('click', resetStopwatch);
document.getElementById('lap').addEventListener('click', recordLap);
