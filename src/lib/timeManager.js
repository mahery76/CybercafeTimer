// timerManager.js
let timerId;

export function startTimer(callback, interval) {
  timerId = setInterval(callback, interval);
}

export function stopTimer() {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
}
