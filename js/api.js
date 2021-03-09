import { addMarkers } from './map.js';
import { createSuccess, createError, showAlert } from './alert.js';

const getData = () => {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((json) => {
      addMarkers(json)
    })
    .catch((err) => {
      showAlert('Произошла ошибка запроса, ' + err);
    })
}

const sendData = (formData) => {
  fetch(
    'https://22.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: formData,
    },
  )
    .then((response) => {
      if (response.ok) {
        createSuccess();
      } else {
        createError();
      }
    })
    .catch(() => {
      createError();
    });
}


export { getData, sendData };
