import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const email = document.querySelector('.feedback-form input');
const message = document.querySelector('.feedback-form textarea');
const STORAGE_KEY = 'feedback-form-state';
let formData = {};

form.addEventListener('input', throttle(formInput, 500));
form.addEventListener('submit', formSubmit);
pageReload();

function formInput(event) {
  formData[event.target.name] = event.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function formSubmit(event) {
  event.preventDefault();
  if (email.value === '' || message.value === '') {
    alert('Please fill in all the fields!');
    return;
  }
  form.reset();
  localStorage.removeItem(STORAGE_KEY);
  console.log(formData);
}

function pageReload() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    formData = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (formData.email) {
      email.value = formData.email;
    }
    if (formData.message) {
      message.value = formData.message;
    }
  }
}
