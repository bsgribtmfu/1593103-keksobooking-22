import { addMarkers } from './map.js';
import { initForm } from './user-input.js';
import { generateSimilarAds } from './data.js';

const ads = generateSimilarAds(10);

initForm();
addMarkers(ads);
