/* global _:readonly */

import { removeMarkers, renderMarkers } from './map.js';
const COUNT_OF_ADS = 10;

const mapFilterForm = document.querySelector('.map__filters');
const selectedType = mapFilterForm.querySelector('#housing-type');
const selectedPrice = mapFilterForm.querySelector('#housing-price');
const selectedRooms = mapFilterForm.querySelector('#housing-rooms');
const selectedGuests = mapFilterForm.querySelector('#housing-guests');

const priceRange = {
  low: {
    min: 0,
    max: 10000,
  },
  middle: {
    min: 10000,
    max: 50000,
  },
  high: {
    min: 50000,
    max: 1000000,
  },
}

const filtredFeatures = (ad) => {
  let featuresElements = [];
  const checkedFeatures = mapFilterForm.querySelectorAll('#housing-features input:checked');
  checkedFeatures.forEach(element => featuresElements.push(element.value))

  return featuresElements.every((item) => ad.offer.features.includes(item));
}

const filterByType = (obj) => selectedType.value === 'any' || obj.offer.type === selectedType.value;
const filterByPrice = (obj) => selectedPrice.value === 'any' || (obj.offer.price >= priceRange[selectedPrice.value].min && obj.offer.price <= priceRange[selectedPrice.value].max)
const filterByRooms = (obj) => selectedRooms.value === 'any' || obj.offer.rooms === +selectedRooms.value;
const filterByGuests = (obj) => selectedGuests.value === 'any' || obj.offer.guests === +selectedGuests.value;

const getFiltredAds = (copiedAds) => {
  const filtredAds = copiedAds
    .slice(0, COUNT_OF_ADS)
    .filter((ad) => {
      return filterByType(ad) &&
        filterByPrice(ad) &&
        filterByRooms(ad) &&
        filterByGuests(ad) &&
        filtredFeatures(ad)
    })
  renderMarkers(filtredAds);
}

const rerenderNewAds = _.debounce((copiedAds) => {
  removeMarkers();
  getFiltredAds(copiedAds);
}, 499);

const handelFormChange = (copiedAds) => {
  mapFilterForm.addEventListener('change', () => {
    rerenderNewAds(copiedAds);
  })
}

export { handelFormChange };
