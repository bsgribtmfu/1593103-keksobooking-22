const housePriceByType = {
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

const initForm = () => {
  type.addEventListener('change', (evt) => {
    price.placeholder = housePriceByType[evt.target.value];
    price.min = housePriceByType[evt.target.value];
  });

  timein.addEventListener('change', (evt) => {
    timeout.value = evt.target.value;
  })

  timeout.addEventListener('change', (evt) => {
    timein.value = evt.target.value;
  })
}

export { initForm };
