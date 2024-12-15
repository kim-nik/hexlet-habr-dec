const timersContainer = document.getElementById("timersContainer");
const addTimerButton = document.getElementById("addTimer");
const timeInput = document.getElementById("timeInput");

function createTimer(duration) {
  const startTime = Date.now();
  const endTime = startTime + duration * 1000;

  const timerElement = document.createElement("div");
  timerElement.className = "timer";
  const timeDisplay = document.createElement("span");
  const stopButton = document.createElement("button");
  stopButton.textContent = "Stop";
  timerElement.appendChild(timeDisplay);
  timerElement.appendChild(stopButton);
  timersContainer.appendChild(timerElement);

  const updateDisplay = () => {
    const currentTime = Date.now();
    const remainingTimeMs = Math.max(endTime - currentTime, 0);

    const seconds = Math.floor(remainingTimeMs / 1000);

    if (remainingTimeMs <= 0) {
      clearInterval(intervalId);
      timersContainer.removeChild(timerElement);
    } else {
      timeDisplay.textContent = `${seconds} seconds remaining`;
    }
  };

  updateDisplay();

  const intervalId = setInterval(updateDisplay, 16); // Обновляем примерно 60 раз в секунду

  stopButton.addEventListener("click", () => {
    clearInterval(intervalId);
    timersContainer.removeChild(timerElement);
  });
}

addTimerButton.addEventListener("click", () => {
  const duration = parseInt(timeInput.value, 10);
  if (!isNaN(duration) && duration > 0) {
    createTimer(duration);
    timeInput.value = "";
  } else {
    alert("Please enter a valid number of seconds.");
  }
});
