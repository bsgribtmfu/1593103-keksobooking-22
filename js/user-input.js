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

const createOptionElement = (content, valueElement) => {
  const optionElement = document.createElement('option');
  optionElement.textContent = content;
  optionElement.value = valueElement;
  capacity.appendChild(optionElement);
}

const changeDefaultValues = () => { // здесь будем корректировать значение по умолчанию в форме, можно конечно разделить на две ф-и
  capacity.innerHTML = '';
  createOptionElement('для 1 гостей', 1); // значение по умолчанию, колличество мест в комнате, 1 комната - 1 гость.
  price.placeholder = housePriceByType['flat']; // цена за ночь, значение по умполчанию, квартира - 1000р.
  price.min = housePriceByType['flat'];
}

const initForm = () => {
  changeDefaultValues();

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
    capacity.innerHTML = '';
    if (evt.target.value == 100) { // почему-то не работает строгое равенство
      createOptionElement('не для гостей', 0);
    } else {
      for (let i = 1; i <= evt.target.value; i++) {
        createOptionElement('для ' + i + ' гостей', i);
      }
    }
  })

  price.addEventListener('input', () => {
    if (price.value > MAX_PRICE_VALUE) {
      price.setCustomValidity('Максимальная цена за ночь составляет 1 000 000 руб.');
      price.value = price.value - (price.value - MAX_PRICE_VALUE); // нннада?
    } else {
      price.setCustomValidity('');
    }
    price.reportValidity();
  })

  title.addEventListener('input', () => { // бредовая идея навешивать это на #title, достаточно добавить в разметку minlength="30" maxlength="100"
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
