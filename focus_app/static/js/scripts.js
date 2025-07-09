let timerDisplay = document.getElementById("timer");
let startBtn = document.getElementById("startBtn");
let pauseBtn = document.getElementById("pauseBtn");
let resetBtn = document.getElementById("resetBtn");
let taskInput = document.getElementById("taskInput");
let taskDisplay = document.getElementById("taskDisplay");
var button;

let countdown;
let timeLeft = 25 * 60; // 25 minutes in seconds equivalent to 1500s
let isRunning = false;
let mode = "work";

function updateTimerDisplay() {
    let minutes = Math.floor(timeLeft / 60 );
    let seconds = timeLeft % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;

        if ( mode === "work") {
            taskDisplay.textContent = `Task: ${taskInput.value || 'Unamed task'}`;
        } else {
            taskDisplay.textContent = " 🚧 Break Time! relax...";
        }

        // taskDisplay.textContent = `Task: ${taskInput.value || 'Unamed task'}`;
        countdown = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
            } else {
                clearInterval(countdown);
                isRunning = false;

                if (mode === "work") {
                    alert("🎉 Work session complete! Time for a 5 minute break.");
                    startBreakTimer();
                } else {
                    alert(" ✅ Break over! Ready to start another session?");
                    resetTimer();
                }
            }
        }, 1000);
    }
}

function startBreakTimer() {
    mode = "break";
    timeLeft = 5 * 60; // 5 minute break equivalent to 300s
    updateTimerDisplay();
    startTimer();
}

function pauseTimer() {
    clearInterval(countdown);
    isRunning = false;
}

function resetTimer() {
    clearInterval(countdown);
    timeLeft = 25 * 60;
    isRunning = false;
    mode = "work";
    updateTimerDisplay();
    taskDisplay.textContent = "";
    taskInput.value = "";
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

updateTimerDisplay(); // initial display