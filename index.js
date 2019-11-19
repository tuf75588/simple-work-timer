const timerDisplay = document.querySelector('.display__time-left');
const timeLeft = document.querySelector('.display__end-time');
const form = document.querySelector('form');
const input = document.querySelector('input');
const buttonGroup = document.querySelectorAll('[data-time]');
let countdown;

function startTimer(milliseconds, displayElement) {
  window.clearInterval(countdown);
  const now = Date.now();
  const then = Date.now() + milliseconds * 1000;
  let difference;

  // eslint-disable-next-line no-use-before-define
  displayEndTime(then);
  // function our interval will run on
  function timer() {
    difference = Math.round(milliseconds - (Date.now() - now) / 1000);
    if (difference < 0) {
      return;
    }
    // eslint-disable-next-line no-use-before-define
    const { minutes, seconds } = displayTimer(difference);

    // eslint-disable-next-line
    displayElement.textContent = `${minutes}:${seconds}`;
    document.title = `${minutes}:${seconds}`;
  }
  timer();
  countdown = setInterval(timer, 1000);
}

function displayTimer(timestamp) {
  let minutes = Math.floor(timestamp / 60);
  let seconds = Math.floor(timestamp % 60);
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;
  return {
    minutes,
    seconds,
  };
}

function displayEndTime(timestamp) {
  const now = new Date(timestamp);
  const hours = now.getHours();
  const minutes = now.getMinutes();
  timeLeft.textContent = `Timer will be done at ${
    hours > 12 ? hours - 12 : hours
  }:${minutes < 10 ? `0${minutes}` : minutes}`;
}

function submitCustomTime(event) {
  event.preventDefault();
  const value = input.value * 60;
  startTimer(value, timerDisplay);
  form.reset();
}

form.addEventListener('submit', submitCustomTime);

buttonGroup.forEach((button) => {
  button.addEventListener('click', () => {
    const { value } = button.attributes['data-time'];
    startTimer(value, timerDisplay);
  });
});
