import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate;
let totalRemainingTime;

const startButtonEl = document.querySelector('.start-button');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
const dateInputEl = document.querySelector('#datetime-picker');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = new Date(selectedDates[0]);

    if (userSelectedDate < new Date()) {
      startButtonEl.classList.remove('active');
      startButtonEl.classList.add('disable');
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        timeout: 5000,
        position: 'topRight',
        backgroundColor: '#ef4040',
        messageColor: '#ffffff',
        iconUrl: '../img/icons/error.svg',
      });
    } else {
      startButtonEl.classList.remove('disable');
      startButtonEl.classList.add('active');
    }
  },
};

flatpickr('input#datetime-picker', options);

startButtonEl.addEventListener('click', () => {
  if (!userSelectedDate) {
    return;
  }

  startButtonEl.classList.remove('active');
  startButtonEl.classList.add('disable');
  dateInputEl.disabled = true;

  const timeInterval = setInterval(() => {
    const currentTime = new Date();
    totalRemainingTime = userSelectedDate - currentTime;
    updateTimer(totalRemainingTime);

    if (totalRemainingTime <= 0) {
      clearInterval(timeInterval);
      updateTimer(0);
      dateInputEl.disabled = false;
      startButtonEl.classList.remove('active');
      startButtonEl.classList.add('disable');
    }
  }, 1000);
});

function updateTimer(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
