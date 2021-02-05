function randomInteger(min, max) {
  if (min >= max || min < 0 || max < 0) return false;
  let rand = Math.random() * (max - min + 1) + min;
  return Math.floor(rand);
}

randomInteger(2, 5);

function randomIntegerCount(min, max, count) {
  let rand;
  if (min >= max || min < 0 || max < 0) return false;
  if (min % 1 === 0 && max % 1 === 0) { // проверка на целое число
    rand = Math.random() * (max - min + 1) + min;
  } else {
    rand = Math.random() * (max - min) + min;
  }
  return rand.toFixed(count);
}

randomIntegerCount(1.2, 1.4, 2);
