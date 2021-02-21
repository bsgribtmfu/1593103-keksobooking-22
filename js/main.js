import { generateSimilarAds } from './data.js';
import { renderCards } from './card.js';

const ads = generateSimilarAds(1);

renderCards(ads);
