import Notiflix from 'notiflix';


const refs = document.querySelector('.form');

refs.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  const data = {
    firstDelay: refs.delay.value,
    delayStep: refs.step.value,
    amount: refs.amount.value,
  };

  const firstDelay = +data.firstDelay;
  const delayStep = +data.delayStep;
  const amount = +data.amount;

  onDoIt(firstDelay, delayStep, amount)
}

function onDoIt(firstDelay, delayStep, amount) {
  let position = 0;
  let delay = firstDelay;
  for (let i = 1; i <= amount; i += 1) {
    createPromise(position, delay);
    position += 1;
    delay += delayStep;
  }
}

function createPromise(position, delay) {
  setTimeout(() => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    } else {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    }
  }, delay);
}

//.currentTarget.value