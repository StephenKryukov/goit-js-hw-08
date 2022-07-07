import { Notify } from 'notiflix/build/notiflix-notify-aio';
import throttle from 'lodash.throttle';
import localStorApi from './localstorage';

const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';
initForm();

const handleSabmit = event => {
  event.preventDefault();
  const { email, message } = event.target.elements;

  if (email.value === '' || message.value === '') {
    Notify.failure('Заповніть всі поля і спробуйте ще раз!');
    return;
  }

  const userData = {};

  const formData = new FormData(form);
  formData.forEach((value, name) => {
    console.log(value, name);
    userData[name] = value;
  });

  event.currentTarget.reset();
  localStorApi.remove(STORAGE_KEY);
  Notify.success("Дякуємо за зворотній зв'язок!");
};

const handleInput = event => {
  const { name, value } = event.target;
  let persistedData = localStorApi.load(STORAGE_KEY);
  persistedData = persistedData ? persistedData : {};

  persistedData[name] = value;
  localStorApi.save(STORAGE_KEY, persistedData);
};

form.addEventListener('input', throttle(handleInput, 300));
form.addEventListener('submit', handleSabmit);

function initForm() {
  let persistedData = localStorApi.load(STORAGE_KEY);
  if (persistedData) {
    Object.entries(persistedData).forEach(([name, value]) => {
      form.elements[name].value = value;
    });
  }
}


// import throttle from 'lodash.throttle';

// const form = document.querySelector('.feedback-form');
// const email = document.querySelector('.feedback-form input');
// const message = document.querySelector('.feedback-form textarea');
// const STORAGE_KEY = 'feedback-form-state';
// let formData = {};

// form.addEventListener('input', throttle(formInput, 500));
// form.addEventListener('submit', formSubmit);
// pageReload();

// function formInput(event) {
//   formData[event.target.name] = event.target.value;
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
// }

// function formSubmit(event) {
//   event.preventDefault();
//   if (email.value === '' || message.value === '') {
//     alert('Please fill in all the fields!');
//     return;
//   }
//   form.reset();
//   localStorage.removeItem(STORAGE_KEY);
//   console.log(formData);
// }

// function pageReload() {
//   const data = localStorage.getItem(STORAGE_KEY);
//   if (data) {
//     formData = JSON.parse(localStorage.getItem(STORAGE_KEY));
//     if (formData.email) {
//       email.value = formData.email;
//     }
//     if (formData.message) {
//       message.value = formData.message;
//     }
//   }
// }