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

const getRandomArrayElement = (elements) => {
  return elements[getRandomInteger(0, elements.length - 1)];
}

export { getRandomInteger, getRandomFloat, getRandomArrayElement };
