function checkNumber(min, max) {
  return (min >= max || min < 0 || max < 0);
}

function getRandomInteger(min, max) {
  if (!checkNumber(min, max)) {
    const rand = Math.random() * (max - min + 1) + min;
    return Math.floor(rand);
  }
  return -1;
}

function getRandomFloat(min, max, quantity) {
  if (!checkNumber(min, max)) {
    const rand = Math.random() * (max - min) + min;
    return rand.toFixed(quantity);
  }
  return -1;
}

const TIMES = ['12:00', '13:00', '14:00'];
const FEATURES_ROOM = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const TYPE_ADS = ['palace', 'flat', 'house', 'bungalow'];
const PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
const SIMILAR_ADS_COUNT = 10;

const getRandomArrayElement = (elements) => {
  return elements[getRandomInteger(0, elements.length - 1)];
}

const createAds = () => {
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
      features: getRandomArrayElement(FEATURES_ROOM),
      desctiption: 'Уютно, чисто, недорого',
      photos: getRandomArrayElement(PHOTOS),
    },
    location: {
      x: locationX,
      y: locationY,
    },
  }
}

const similarAds = new Array(SIMILAR_ADS_COUNT)
  .fill(null)
  .map(() => createAds());

similarAds;
