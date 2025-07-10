import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import iconError from '/public/icons/error.svg';
import iconSuccess from '/public/icons/success.svg';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const state = formEl.elements.state.value;
  const delay = formEl.elements.delay.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay => {
      iziToast.success({
        title: 'OK',
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        backgroundColor: '#59a10d',
        iconUrl: iconSuccess,
        messageColor: '#ffffff',
        titleColor: '#ffffff',
      });
    })
    .catch(delay => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
        backgroundColor: '#ef4040',
        messageColor: '#ffffff',
        titleColor: '#ffffff',
        iconUrl: iconError,
      });
    });

  formEl.reset();
}
