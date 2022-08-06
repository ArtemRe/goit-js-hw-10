import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import flatpickr from 'flatpickr';
require('flatpickr/dist/themes/dark.css');

let endData = new Date();

const refs = {
  btn: document.querySelector('button'),
  input: document.querySelector('input'),

  timer: document.querySelector('.timer'),

  d: document.querySelector('span[data-days]'),
  h: document.querySelector('span[data-hours]'),
  i: document.querySelector('span[data-minutes]'),
  s: document.querySelector('span[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    endData = selectedDates[0];
    checkDate();
  },
};
refs.btn.addEventListener('click', startTimer);
flatpickr('#datetime-picker', options);
toggleOnOffButton([refs.btn]);

function startTimer() {
  toggleOnOffButton([refs.btn, refs.input]);
  const onDoIt = function () {
    const diffTime = endData.getTime() - new Date().getTime();
    const time = getNormalTime(diffTime);
    if (diffTime < 0) {
      clearTimeout(idInterval);
      Notify.success('Timer finished sucses');

      return;
    }
    inner(time);
  };

  const idInterval = setInterval(onDoIt, 1000);
}

function getNormalTime(t) {
  const result = {
    d: Math.floor(t / (1000 * 60 * 60 * 24)),
    h: Math.floor((t / (1000 * 60 * 60)) % 24),
    i: Math.floor((t / (1000 * 60)) % 60),
    s: Math.floor((t / 1000) % 60),
  };
  return result;
}

function toggleOnOffButton(btn, off) {
  const arr = [...btn];
  if (off === true) {
    arr.map(el => {
      el.setAttribute('disabled', 'disabled');
    });
    return;
  }
  if (off === false) {
    arr.map(el => {
      el.removeAttribute('disabled');
    });
    return;
  }
  arr.map(el => {
    if (!el.hasAttribute('disabled')) {
      el.setAttribute('disabled', 'disabled');
    } else {
      el.removeAttribute('disabled');
    }
  });
}

function checkDate() {
  if (endData.getTime() < new Date().getTime()) {
    Notify.failure('Please choose a date in the future');
    toggleOnOffButton([refs.btn], true);
    return;
  }
  toggleOnOffButton([refs.btn, refs.input], false);
}

function formatingTime(a) {
  return a.toString().padStart(2, '0');
  console.log(a.toString().padStart(2, '0'));
}

function inner({ d, h, i, s }) {
  refs.d.textContent = formatingTime(d);
  refs.h.textContent = formatingTime(h);
  refs.i.textContent = formatingTime(i);
  refs.s.textContent = formatingTime(s);
}

// const select = {
//   enableTime: true,
//   dateFormat: 'Y-m-d H:i',
// };
// flatpickr(refs.input, select);
