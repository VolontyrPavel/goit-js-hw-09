import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import Notiflix from 'notiflix';

let timerId = null;

const refs = {
    input: document.querySelector('input'),
    start: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
}

refs.start.setAttribute('disabled', true);

let newDate = 0;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < Date.now()) {
            Notiflix.Notify.failure('Please choose a date in the future');
        } else {
            refs.start.removeAttribute('disabled');
            newDate += Date.parse(selectedDates[0]);
            return newDate;
        }
    },
};

flatpickr('input', options);

refs.start.addEventListener('click', onStart);

function onStart() {
    timerId = setInterval(betweenTime, 1000);
}

function betweenTime() {
    const ms = newDate - Date.now();
    if (ms > 0) {
        refs.days.textContent = addLeadingZero(convertMs(ms).days);
        refs.hours.textContent = addLeadingZero(convertMs(ms).hours);
        refs.minutes.textContent = addLeadingZero(convertMs(ms).minutes);
        refs.seconds.textContent = addLeadingZero(convertMs(ms).seconds);
    } else {
        clearInterval(timerId);
        return
    }

}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0')
}


























