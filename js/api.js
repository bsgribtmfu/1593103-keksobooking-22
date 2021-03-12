import { addMarkers } from './map.js';
import { createSuccess, createError, showAlert } from './alert.js';

const URL_DATA = 'https://22.javascript.pages.academy/keksobooking';

const getData = () => {
  fetch(`${URL_DATA}/data`)
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
      showAlert(`Произошла ошибка запроса, ${err}`);
    })
}

const sendData = (formData) => {
  fetch(
    URL_DATA,
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
