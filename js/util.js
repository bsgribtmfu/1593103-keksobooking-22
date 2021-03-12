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

const getRandomArrayElement = (array) => {
  return array[getRandomInteger(0, array.length - 1)];
}

const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

export { getRandomInteger, getRandomFloat, getRandomArrayElement, isEscEvent };
