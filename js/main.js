import { generateSimilarAds } from './data.js';
import { renderCards } from './card.js';
import './user-input.js';

const ads = generateSimilarAds(1);

renderCards(ads);
