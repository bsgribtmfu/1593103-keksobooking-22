import { sendData, initialAds } from './api.js';
import { uploadPhoto } from './photo.js';
import { mainPinMarker, LATITUDE, LONGITUDE, addressInput, removeMarkers, renderMarkers } from './map.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_VALUE = 1000000;
const ICON_FOR_UPLOAD_FORM = 'img/muffin-grey.svg';
const COORDINATE_PRECISION = 5;

const housePriceByType = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

const form = document.querySelector('.ad-form');
const formMapFilter = document.querySelector('.map__filters');
const title = form.querySelector('#title');
const type = form.querySelector('#type');
const price = form.querySelector('#price');
const timeIn = form.querySelector('#timein');
const timeOut = form.querySelector('#timeout');
const roomNumber = form.querySelector('#room_number');
const capacity = form.querySelector('#capacity');
const reset = form.querySelector('.ad-form__reset');
const fileChooserAvatar = form.querySelector('.ad-form-header__input');
const elementPhotoForAvatar = form.querySelector('.ad-form-header__preview > img');
const fileChooserHousePhoto = form.querySelector('.ad-form__input');
const elementPhotoForHouse = form.querySelector('.ad-form__photo');


const createOptionElement = (content, valueElement, element) => {
  const optionElement = document.createElement('option');
  optionElement.textContent = content;
  optionElement.value = valueElement;
  element.prepend(optionElement);
}

const changeDefaultValues = (capacityElement, priceElement) => {
  capacityElement.innerHTML = '';
  createOptionElement('для 1 гостей', 1, capacity);
  priceElement.placeholder = housePriceByType['flat'];
  priceElement.min = housePriceByType['flat'];
}

const initForm = () => {
  changeDefaultValues(capacity, price);

  type.addEventListener('change', (evt) => {
    price.placeholder = housePriceByType[evt.target.value];
    price.min = housePriceByType[evt.target.value];
  });

  timeIn.addEventListener('change', (evt) => {
    timeOut.value = evt.target.value;
  })

  timeOut.addEventListener('change', (evt) => {
    timeIn.value = evt.target.value;
  });

  roomNumber.addEventListener('change', (evt) => {
    let value = evt.target.value;
    capacity.innerHTML = '';
    if (Number(value) === 100) {
      createOptionElement('не для гостей', 0, capacity);
    } else {
      for (let i = 1; i <= value; i++) {
        createOptionElement('для ' + i + ' гостей', i, capacity);
      }
    }
  });

  price.addEventListener('input', () => {
    if (price.value > MAX_PRICE_VALUE) {
      price.setCustomValidity('Максимальная цена за ночь составляет 1 000 000 руб.');
      price.value = price.value - (price.value - MAX_PRICE_VALUE);
    } else {
      price.setCustomValidity('');
    }
    price.reportValidity();
  });

  title.addEventListener('input', () => {
    const valueLength = title.value.length
    if (valueLength < MIN_TITLE_LENGTH) {
      title.setCustomValidity('Ещё ' + (MIN_TITLE_LENGTH - valueLength) +' симв.');
    } else if (valueLength > MAX_TITLE_LENGTH) {
      title.setCustomValidity('Удалите лишние ' + (valueLength - MAX_TITLE_LENGTH) +' симв.');
    } else {
      title.setCustomValidity('');
    }
  });

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(new FormData(evt.target));
  });

  reset.addEventListener('click', (evt) => {
    evt.preventDefault();
    resetForm();
  });
}

const resetForm = () => {
  form.reset();
  removeMarkers();
  renderMarkers(initialAds);
  clearFormUpload();
  formMapFilter.reset();
  changeDefaultValues(capacity, price);
  mainPinMarker.setLatLng({lat: LATITUDE, lng: LONGITUDE});
  addressInput.value = `${LATITUDE.toFixed(COORDINATE_PRECISION)}, ${LONGITUDE.toFixed(COORDINATE_PRECISION)}`;
}

const clearFormUpload = () => {
  const photoHouse = elementPhotoForHouse.querySelector('img');
  elementPhotoForAvatar.src = ICON_FOR_UPLOAD_FORM;
  photoHouse.src = ICON_FOR_UPLOAD_FORM;
}

const styleFormPhoto = () => {
  elementPhotoForHouse.style.display = 'flex';
  elementPhotoForHouse.style.alignItems = 'center';
  elementPhotoForHouse.style.justifyContent = 'center';
}

const addPhotoPreview = () => {
  styleFormPhoto();
  const image = document.createElement('img');
  image.src = ICON_FOR_UPLOAD_FORM;
  image.alt = 'Фотографии жилья';
  image.width = 40;
  image.height = 44;
  elementPhotoForHouse.append(image);
  return image;
}

uploadPhoto(fileChooserAvatar, elementPhotoForAvatar);
uploadPhoto(fileChooserHousePhoto, addPhotoPreview());

export { initForm, resetForm };
