const rangePrice = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

const form = document.querySelector('.ad-form');
const type = form.querySelector('#type');
const price = form.querySelector('#price');
const timein = form.querySelector('#timein');
const timeout = form.querySelector('#timeout');


type.addEventListener('change', (evt) => {
  price.placeholder = rangePrice[evt.target.value];
  price.min = rangePrice[evt.target.value];
});

timein.addEventListener('change', (evt) => {
  timeout.value = evt.target.value;
})

timeout.addEventListener('change', (evt) => {
  timein.value = evt.target.value;
})
