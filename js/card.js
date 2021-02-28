const wordConversion = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
}

const createImageElement = (item, elements) => { // создание изображения
  const fragment = document.createDocumentFragment(); // создание минимального обьекта документа (DocumentFragment)
  if (item) {
    for (let i = 0; i < elements.length; i++) {
      const image = document.createElement('img');
      image.src = elements[i];
      image.classList.add('popup__photo');
      image.width = '45';
      image.height = '40';
      image.alt = 'Фотография жилья';
      fragment.append(image);
    }
    return fragment;
  } else {
    item.remove();
  }
}

const createFeatures = (item, elements) => { // создание блока элементов "преимущества"
  const fragment = document.createDocumentFragment(); // создание минимального обьекта документа (DocumentFragment)
  if (item) {
    for (let i = 0; i < elements.length; i++) {
      const featureElement = document.createElement('li');
      featureElement.classList.add('popup__feature', `popup__feature--${elements[i]}`);
      fragment.append(featureElement);
    }
    return fragment;
  } else {
    item.remove();
  }
}

const appendContent = (element, content) => { // добавление содержимого элементу
  if (content) {
    element.textContent = content;
  } else {
    element.remove();
  }
}

const generateCardTemplate = (card) => { // генерация одной карточки, HTML элемент контент шаблона (template)
  const template = document.querySelector('#card').content;
  const cardTemplate = template.querySelector('.popup');

  const clonedCard = cardTemplate.cloneNode(true); // метод Node.cloneNode() возвращает дубликат узла, из которого этот метод был вызван

  const avatar = clonedCard.querySelector('.popup__avatar');
  const title = clonedCard.querySelector('.popup__title');
  const address = clonedCard.querySelector('.popup__text--address');
  const price = clonedCard.querySelector('.popup__text--price');
  const type = clonedCard.querySelector('.popup__type');
  const capacity = clonedCard.querySelector('.popup__text--capacity');
  const time = clonedCard.querySelector('.popup__text--time');
  const features = clonedCard.querySelector('.popup__features');
  const description = clonedCard.querySelector('.popup__description');
  const photo = clonedCard.querySelector('.popup__photos');

  description.innerHTML = '';
  features.innerHTML = '';
  photo.innerHTML = '';

  if (card.author.avatar) {
    avatar.src = card.author.avatar;
  } else {
    avatar.remove();
  }

  if (card.offer.rooms && card.offer.guests) {
    appendContent(capacity, `${card.offer.rooms} комнаты для ${card.offer.guests} гостей`);
  } else {
    capacity.remove();
  }

  if (card.offer.price) {
    appendContent(price, `${card.offer.price} ₽/ночь`);
  } else {
    price.remove();
  }

  if (card.offer.checkin && card.offer.checkout) {
    appendContent(time, `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}`);
  } else {
    time.remove();
  }

  appendContent(title, card.offer.title);
  appendContent(address, card.offer.address);
  appendContent(type, wordConversion[card.offer.type]);
  appendContent(description, card.offer.description);

  features.appendChild(createFeatures(features, card.offer.features));
  photo.appendChild(createImageElement(photo, card.offer.photos));

  return clonedCard;
}

const renderCards = (similarOffers) => { // отрисовка элементов по шаблону, принимает массив сгенерированных карточек
  const map = document.querySelector('.map__canvas');

  similarOffers.forEach((card) => {
    const mapCard = generateCardTemplate(card);
    map.appendChild(mapCard);
  });
}

export { renderCards, generateCardTemplate };
