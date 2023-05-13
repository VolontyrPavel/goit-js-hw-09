refs = {
    start: document.querySelector('[data-start]'),
    stop: document.querySelector('[data-stop]'),
    body: document.querySelector('body'),
}
let timerId = null;

refs.start.addEventListener('click', onStartInterval);
refs.stop.addEventListener('click', onStop);

refs.stop.setAttribute('disabled', true);

function onStartInterval() {
    refs.start.setAttribute('disabled', true);
    refs.stop.removeAttribute('disabled');
    timerId = setInterval(onStart, 1000)
}

function onStart() {
    refs.body.style.backgroundColor = getRandomHexColor();
}

function onStop() {
    clearInterval(timerId);
    refs.start.removeAttribute('disabled');
    refs.stop.setAttribute('disabled', true);
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
