import { Notify } from 'notiflix/build/notiflix-notify-aio';
const formEl = document.querySelector('.form');
const delayEl = document.querySelector('input[name="delay"]');
const stepEl = document.querySelector('input[name="step"]');
const amountEl = document.querySelector('input[name="amount"]');

formEl.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  evt.preventDefault();
  const stepValue = Number(stepEl.value);
  const amountValue = Number(amountEl.value);
  let delayValue = Number(delayEl.value);

  for (let i = 1; i <= amountValue; i += 1) {
    createPromise(i, delayValue).then(onFulfilled).catch(onRejected);
    delayValue += stepValue;
  }
}
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}
function onFulfilled(result) {
  console.log(result);
  Notify.success(result, {
    useIcon: false,
  });
}
function onRejected(error) {
  console.log(error);
  Notify.failure(error, {
    useIcon: false,
  });
}

