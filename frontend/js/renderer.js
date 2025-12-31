let seconds = 0;
let timerInterval = null;
let screenshotTimeout = null;

let sessionId = 1;
let imageIndex = 1;

const timer = document.getElementById("timer");
const screenshots = document.getElementById("screenshots");

// ---------------- TIMER ----------------
function updateTimer() {
  seconds++;
  const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  timer.textContent = `${h}:${m}:${s}`;
}

// ------------- RANDOM INTERVAL ----------
function getRandomDelay() {
  const min = 3 * 60 * 1000;  // 3 min
  const max = 10 * 60 * 1000; // 10 min
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ----------- SCREENSHOT LOOP ------------
async function scheduleScreenshot() {
  const delay = getRandomDelay();

  screenshotTimeout = setTimeout(async () => {
    await captureScreenshot();
    scheduleScreenshot(); // re-schedule with new random delay
  }, delay);
}

// ------------ CAPTURE -------------------
async function captureScreenshot() {
  const imgData = await window.electronAPI.captureScreen({
    sessionId,
    imageIndex
  });

  const img = document.createElement("img");
  img.src = imgData;
  img.width = 120;
  screenshots.appendChild(img);

  imageIndex++;
}

// ------------ BUTTONS -------------------
document.getElementById("start").onclick = () => {
  if (!timerInterval) {
    timerInterval = setInterval(updateTimer, 1000);
    scheduleScreenshot();
  }
};

document.getElementById("pause").onclick = () => {
  clearInterval(timerInterval);
  clearTimeout(screenshotTimeout);
  timerInterval = null;
};

document.getElementById("stop").onclick = () => {
  clearInterval(timerInterval);
  clearTimeout(screenshotTimeout);

  timerInterval = null;
  seconds = 0;
  timer.textContent = "00:00:00";

  // new session
  sessionId++;
  imageIndex = 1;
};
