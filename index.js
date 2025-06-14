const timerDisplay = document.getElementById("timerDisplay");
const inputName = document.getElementById("inputName");
const inputHours = document.getElementById("inputHours");
const inputMinutes = document.getElementById("inputMinutes");
const timerNameDisplay = document.getElementById("timerName");
const customTimersList = document.getElementById("customList");  // fixed ID

let timerName = '';
let duration = 0;
let remaining = 0;
let isPaused = false;
let interval = null;

function setTimer() {
    timerName = inputName.value.trim();
    const hours = parseInt(inputHours.value) || 0;
    const minutes = parseInt(inputMinutes.value) || 0;
    duration = (hours * 3600) + (minutes * 60);
    remaining = duration;

    if (!timerName || duration <= 0) {
        alert("Please enter a valid timer name and time.");
        return;
    }
    timerNameDisplay.textContent = timerName;
    updateDisplay();
}

function startTimer() {
    if (remaining <= 0 || interval) return;

    interval = setInterval(() => {
        if (!isPaused) {
            remaining--;
            updateDisplay();
            if (remaining <= 0) {
                clearInterval(interval);
                interval = null;
                alert("Time is Up");
            }
        }
    }, 1000);
}

function updateDisplay() {
    const hrs = Math.floor(remaining / 3600);
    const mins = Math.floor((remaining % 3600) / 60);
    const secs = remaining % 60;

    timerDisplay.textContent = `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function pauseTimer() {
    isPaused = !isPaused;
}

function stopTimer() {
    clearInterval(interval);
    interval = null;
    remaining = 0;
    updateDisplay();
}

function resetTimer() {
    clearInterval(interval);
    interval = null;
    remaining = duration;
    updateDisplay();
}

// Event listeners
document.getElementById("setTimerBtn").addEventListener("click", setTimer);
document.getElementById("startBtn").addEventListener("click", startTimer);
document.getElementById("pauseBtn").addEventListener("click", pauseTimer);
document.getElementById("stopBtn").addEventListener("click", stopTimer);
document.getElementById("resetBtn").addEventListener("click", resetTimer);

document.getElementById("studyBtn").addEventListener("click", () => {
    inputName.value = "Study Session";
    inputHours.value = "0";
    inputMinutes.value = "25";
    setTimer();
});

document.getElementById("gymBtn").addEventListener("click", () => {
    inputName.value = "Workout";
    inputHours.value = "1";
    inputMinutes.value = "0";
    setTimer();
});

document.getElementById("addBtn").addEventListener("click", () => {
    const customName = prompt("Enter custom timer name:");
    let customTime = prompt("Enter duration in MM format (e.g., 30):");

    customTime = parseInt(customTime);
    if (!customName || isNaN(customTime) || customTime <= 0) {
        alert("Please enter a valid name and duration.");
        return;
    }

    const li = document.createElement("li");
    li.textContent = `${customName} - ${customTime} min`;
    li.style.cursor = "pointer";
    li.addEventListener("click", () => {
        inputName.value = customName;
        inputHours.value = "0";
        inputMinutes.value = customTime;
        setTimer();
    });
    customTimersList.appendChild(li);
});

