function checkNumber(min, max) {
  return (min >= max || min < 0 || max < 0);
}

function getRandomInteger(min, max) {
  if (!checkNumber(min, max)) {
    const rand = Math.random() * (max - min + 1) + min;
    return Math.floor(rand);
  }
  return false;
}

getRandomInteger(2, 5);

function getRandomFloat(min, max, quantity) {
  if (!checkNumber(min, max)) {
    const rand = Math.random() * (max - min) + min;
    return rand.toFixed(quantity);
  }
  return false;
}

getRandomFloat(1.2, 1.4, 2);
