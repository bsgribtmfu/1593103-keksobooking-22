import { generateSimilarAds } from './data.js';
import { addMarker } from './map.js';
import { initForm } from './user-input.js';

initForm();

const generateAds = generateSimilarAds(10);

generateAds.forEach((card) => {
  addMarker(card);
});
