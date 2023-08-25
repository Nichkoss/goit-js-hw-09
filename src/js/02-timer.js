import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

Notify.init({
  width: '280px',
  position: 'right-top',
  distance: '10px',
  opacity: 1,
});


const refs = {
    inputEl: document.querySelector('#datetime-picker'),
    btnStart: document.querySelector('[data-start]'),
    clockFace: document.querySelector('.timer'),
    daysNum: document.querySelector('[data-days]'),
    hoursNum: document.querySelector('[data-hours]'),
    minutesNum: document.querySelector('[data-minutes]'),
    secondsEl: document.querySelector('[data-seconds]')
};


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);
        validCurrentDate();
    },
};

const datePicker = flatpickr(refs.inputEl, options);
refs.btnStart.disabled = true;
let isActive = false;

function validCurrentDate() {
    const now = new Date();
    console.log(now)
    if (datePicker.selectedDates[0] < now) {
        Notify.failure('Please choose a date in the future');
        refs.btnStart.disabled = true;
        return;
    };
    refs.btnStart.disabled = false;
};

refs.btnStart.addEventListener('click', () => {
    if (isActive === true) {
        return
    };

    let timerTime = datePicker.selectedDates[0] - Date.now();
    const intervalId = setInterval(() => {
       isActive = true;
        timerTime = datePicker.selectedDates[0] - Date.now();
        const timeComponents = convertMs(timerTime)
        console.log(timeComponents);
    
        updateClockface(timeComponents);
        
        if (timerTime <= 1000) {
            clearInterval(intervalId);
            refs.clockFace.textContent = "00:00:00:00"
            return
           };
    }, 1000)
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
};

function updateClockface({ days, hours, minutes, seconds }) {
    refs.clockFace.textContent = `${days}:${hours}:${minutes}:${seconds}`;
    refs.clockFace.textContent
};

function addLeadingZero(value){
    return String(value).padStart(2, '0')
}





