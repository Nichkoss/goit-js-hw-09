import { Notify } from 'notiflix/build/notiflix-notify-aio';

Notify.init({
  width: '280px',
  position: 'right-top',
  distance: '10px',
  opacity: 1,
});


const formEl = document.querySelector('.form')

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve ({ position, delay })
      } else {
       reject ({ position, delay })
      }
      
    }, delay)
  })
}


function submitForm(event) {
  event.preventDefault();
  const { delay, step, amount } = event.target.elements;
  let delayEl = parseInt(delay.value);
  let stepEl = parseInt(step.value);

  for (let i = 1; i <= amount.value; i++) {
    createPromise(i, delayEl)
      .then(({ position, delay }) => {
       Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    
    delayEl += stepEl;
  }

}

formEl.addEventListener('submit', submitForm)