/* global L:readonly */

import { generateCardTemplate } from './card.js';

const LATITUDE = 35.6894; // широта
const LONGITUDE = 139.692; // долгота
const ZOOM = 12; // масштаб

const adForm = document.querySelector('.ad-form');
const mapFilterForm = document.querySelector('.map__filters');

const adFormItems = adForm.children;
const mapFilterFormItems = mapFilterForm.children;

const addressInput = document.querySelector('#address');

const deactivateForm = (elements) => {
  adForm.classList.add('ad-form--disabled');
  mapFilterForm.classList.add('ad-form--disabled');

  Array.from(elements).forEach(element => {
    element.disabled = true;
    // element.setAttribute()
  });
}

const activateForm = (elements) => {
  adForm.classList.remove('ad-form--disabled');
  mapFilterForm.classList.remove('ad-form--disabled');

  Array.from(elements).forEach(element => {
    element.disabled = false;
    // element.removeAttribute()
  });
}

deactivateForm(adFormItems);
deactivateForm(mapFilterFormItems);

const map = L.map('map-canvas').on('load', () => { // инициализация карты
  activateForm(adFormItems)
  activateForm(mapFilterFormItems);
  addressInput.value = `${LATITUDE.toFixed(5)}, ${LONGITUDE.toFixed(5)}`;
  addressInput.readOnly = true;
})
  .setView({
    lat: LATITUDE,
    lng: LONGITUDE,
  }, ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({ // стилизация иконки основной метки
  iconUrl: 'img/main-pin.svg',
  iconSize: [50, 82],
  iconAnchor: [25, 82],
});

const mainPinMarker = L.marker( // основная метка, координаты Токио
  {
    lat: LATITUDE,
    lng: LONGITUDE,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map); // добавление основного метки

mainPinMarker.on('moveend', (evt) => { // перемещение главной метки
  let target = evt.target.getLatLng();
  addressInput.value = `${target['lat'].toFixed(5)}, ${target['lng'].toFixed(5)}`;
});


const icon = L.icon({ // стилизация иконки
  iconUrl: 'img/pin.svg',
  iconSize: [50, 82],
  iconAnchor: [25, 82],
});

const addMarker = (card) => {
  const marker = L.marker(
    {
      lat: card.location.x,
      lng: card.location.y,
    },
    {
      icon,
    },
  );

  marker
    .addTo(map)
    .bindPopup(generateCardTemplate(card));
}

export { addMarker };
