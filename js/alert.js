import { resetForm } from './user-input.js';

const ALERT_SHOW_TIME = 5000;
const main = document.querySelector('main');

const successMessage = document.querySelector('#success')
  .content
  .querySelector('.success')
  .cloneNode(true);

const errorMessage = document.querySelector('#error')
  .content
  .querySelector('.error')
  .cloneNode(true);

const errorButton = errorMessage.querySelector('.error__button');

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

const removeErrorMessage = () => {
  errorMessage.remove();
  errorButton.removeEventListener('click', onClickButton);
  errorMessage.removeEventListener('click', onClickError);
  document.removeEventListener('keydown', onEscapeError);
}

const removeSuccessMessage = () => {
  resetForm();
  successMessage.remove();
  successMessage.addEventListener('click', onClickSuccess);
  document.addEventListener('keydown', onEscapeSuccess);
}

const onClickButton = (evt) => { // ненужная ф-я, тк мы и так удаляем popup при клике на произвольную область экранa, но согласно ТЗ п. 2.7 реализовать это нужно
  evt.preventDefault();
  removeErrorMessage();
}

const createError = () => {
  main.append(errorMessage);
  errorButton.addEventListener('click', onClickButton);
  errorMessage.addEventListener('click', onClickError);
  document.addEventListener('keydown', onEscapeError);
}

const createSuccess = () => {
  main.append(successMessage);
  // errorButton.addEventListener('click', onClickButton);
  successMessage.addEventListener('click', onClickSuccess);
  document.addEventListener('keydown', onEscapeSuccess);
}

const onEscapeError = (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    removeErrorMessage();
  }
}

const onClickError = () => {
  removeErrorMessage();
}

const onEscapeSuccess= (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    removeSuccessMessage();
  }
}

const onClickSuccess = () => {
  removeSuccessMessage();
}

export { createSuccess, createError, showAlert };
