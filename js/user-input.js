const housePriceByType = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_VALUE = 1000000;

const form = document.querySelector('.ad-form');
const title = form.querySelector('#title');
const type = form.querySelector('#type');
const price = form.querySelector('#price');
const timein = form.querySelector('#timein');
const timeout = form.querySelector('#timeout');
const roomNumber = form.querySelector('#room_number');
const capacity = form.querySelector('#capacity');

const createOptionElement = (content, valueElement, element) => {
  const optionElement = document.createElement('option');
  optionElement.textContent = content;
  optionElement.value = valueElement;
  element.appendChild(optionElement);
}

const changeDefaultValues = (capacityElement, priceElement) => { // здесь будем корректировать значение по умолчанию в форме, можно конечно разделить на две ф-и
  capacityElement.innerHTML = '';
  createOptionElement('для 1 гостей', 1, capacity); // значение по умолчанию, колличество мест в комнате, 1 комната - 1 гость.
  priceElement.placeholder = housePriceByType['flat']; // цена за ночь, значение по умполчанию, квартира - 1000р.
  priceElement.min = housePriceByType['flat'];
}

const initForm = () => {
  changeDefaultValues(capacity, price);

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

  roomNumber.addEventListener('change', (evt) => {
    let value = evt.target.value;
    capacity.innerHTML = '';
    if (+value === 100) {
      createOptionElement('не для гостей', 0, capacity);
    } else {
      for (let i = 1; i <= value; i++) {
        createOptionElement('для ' + i + ' гостей', i, capacity);
      }
    }
  })

  price.addEventListener('input', () => {
    if (price.value > MAX_PRICE_VALUE) {
      price.setCustomValidity('Максимальная цена за ночь составляет 1 000 000 руб.');
      price.value = price.value - (price.value - MAX_PRICE_VALUE);
    } else {
      price.setCustomValidity('');
    }
    price.reportValidity();
  })

  title.addEventListener('input', () => {
    const valueLength = title.value.length
    if (valueLength < MIN_TITLE_LENGTH) {
      title.setCustomValidity('Ещё ' + (MIN_TITLE_LENGTH - valueLength) +' симв.');
    } else if (valueLength > MAX_TITLE_LENGTH) {
      title.setCustomValidity('Удалите лишние ' + (valueLength - MAX_TITLE_LENGTH) +' симв.');
    } else {
      title.setCustomValidity('');
    }
  });
}

export { initForm };
