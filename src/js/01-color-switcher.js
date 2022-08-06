function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const start = document.querySelector('button[data-start]');
const stop = document.querySelector('button[data-stop]');

stop.disabled = true;

start.addEventListener('click', onStartClick);
stop.addEventListener('click', onStopClick);

function onStartClick() {
  stop.removeAttribute('disabled');
  start.disabled = true;
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  console.log('start click');
}

function onStopClick() {
  start.removeAttribute('disabled');
  stop.disabled = true;
  clearInterval(timerId);
  console.log('stop click');
}
