function getRandomInteger(min, max) {
  if (min >= max || min < 0 || max < 0) {
    return false;
  }
  const rand = Math.random() * (max - min + 1) + min;
  return Math.floor(rand);
}

getRandomInteger(2, 5);

function getRandomNumber(min, max, quantity) {
  let rand;
  if (min >= max || min < 0 || max < 0) {
    return false;
  }
  if (min % 1 === 0 && max % 1 === 0) { // проверка на целое число
    rand = Math.random() * (max - min + 1) + min;
  } else {
    rand = Math.random() * (max - min) + min; // если число не целое используем другой алгоритм/формулу
  }
  return rand.toFixed(quantity);
}

getRandomNumber(1.2, 1.4, 2);
