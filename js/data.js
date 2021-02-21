import { getRandomInteger, getRandomFloat, getRandomArrayElement } from './util.js';

const TIMES = ['12:00', '13:00', '14:00'];
const ROOM_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const TYPE_ADS = ['palace', 'flat', 'house', 'bungalow'];
const PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
const DESCRIPTIONS = ['Номер в центре Токио, очень просторно - 10 м2, но шумно.', 'Номер на берегу моря, приятный свежий воздух, и самые красивые закаты.', 'Номер в спальном район, тихое место, близко до цента.']

const getNonrepeatingList = (array, count) => {
  const uniqList = new Set();
  for(let i = 0; i < count; i++) {
    uniqList.add(getRandomArrayElement(array));
  }
  return [...uniqList];
}

const createAd = () => {
  const locationX = getRandomFloat(35.65000, 35.70000, 5);
  const locationY = getRandomFloat(139.70000, 139.80000, 5);

  return {
    author: {
      avatar: 'img/avatars/user0' + getRandomInteger(1, 8) + '.png',
    },
    offer: {
      title: 'Лучшие номера в нашем отеле',
      address: `${locationX}, ${locationY}`,
      price: getRandomInteger(10, 1000),
      type: getRandomArrayElement(TYPE_ADS),
      rooms: getRandomInteger(1, 5),
      guests: getRandomInteger(1, 20),
      checkin: getRandomArrayElement(TIMES),
      checkout: getRandomArrayElement(TIMES),
      features: getNonrepeatingList(ROOM_FEATURES, 3),
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: getNonrepeatingList(PHOTOS, 5),
    },
    location: {
      x: locationX,
      y: locationY,
    },
  }
}

const generateSimilarAds = (count) => {
  const totalAds = [];
  for (let i = 0; i < count; i++) {
    totalAds.push(createAd());
  }
  return totalAds;
}

export { generateSimilarAds };
