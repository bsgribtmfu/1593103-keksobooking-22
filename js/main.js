function randomInteger(min, max) {
  if (min >= max || min < 0 || max < 0) return false;
  let rand = min + Math.random() * (max + 1e-10 - min);
  return Math.floor(rand);
}

randomInteger(1, 5);

function randomIntegerCount(min, max, count) {
  if (min >= max || min < 0 || max < 0) return false;
  let rand = min + Math.random() * (max + 1e-10 - min);
  return rand.toFixed(count);
}

console.log( randomIntegerCount(1.2, 1.5, 11) );
