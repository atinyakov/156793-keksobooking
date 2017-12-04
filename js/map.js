'use strict';

var OFFER_TITLES = [
  'Большая уютная квартира',
  'Неуютное бунгало по колено в воде',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
];

var OFFER_TYPES = [
  'flat',
  'house',
  'bungalo'
];

var OFFER_TYPES_RUS = [
  'Квартира',
  'Дом',
  'Бунгало'
];

var OFFER_TIMES = [
  '12:00',
  '13:00',
  '14:00'
];

var FEATURES_LIST = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var OFFERS_AMOUNT = 8;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var offerList = [];
// generates random number
var randomInteger = function (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
};

var features = [];
var randomLengthArr = function (arr) {
  for (var i = 0; i <= randomInteger(1, (arr.length - 1)); i++) {
    var itemToFeatures = arr[randomInteger(0, arr.length - 1)];
    for (var j = 0; j <= features.length; j++) {
      if (features.indexOf(itemToFeatures) === -1) {
        features.push(itemToFeatures);
      }
    }
  }
};
randomLengthArr(FEATURES_LIST);

var offerTemplate = function (i) {
  var id = ++i;
  var x = randomInteger(300, 900) - 40 / 2;
  var y = randomInteger(100, 500) - 40;
  var template = {
    author: {
      avatar: 'img/avatars/user0' + id + '.png'
    },
    offer: {
      title: OFFER_TITLES[randomInteger(0, OFFER_TITLES.length - 1)],
      address: '' + x + ',' + y,
      price: randomInteger(1000, 1000000),
      type: OFFER_TYPES[randomInteger(0, OFFER_TYPES.length - 1)],
      rooms: randomInteger(1, 5),
      guests: randomInteger(0, 3),
      checkin: OFFER_TIMES[randomInteger(0, OFFER_TIMES.length - 1)],
      checkout: OFFER_TIMES[randomInteger(0, OFFER_TIMES.length - 1)],
      features: features,
      description: '',
      photos: []
    },
    location: {
      x: x,
      y: y,
    }
  };
  return template;
};

var fillOfferList = function () {
  for (var i = 0; i < OFFERS_AMOUNT; i++) {
    offerList.push(offerTemplate(i));
  }
};
fillOfferList();
var mapContainer = document.querySelector('.map');
var sampleMapPin = mapContainer.querySelector('.map__pins');
var form = document.querySelector('.notice__form');
var fieldset = document.querySelectorAll('fieldset');
// make fieldset inactive on start
for (var j = 0; j < fieldset.length; j++) {
  fieldset[j].setAttribute('disabled', 'disabled');
}

var onPageTemplate = document.querySelector('template').content;
onPageTemplate.querySelector('.popup__features').innerHTML = '';
var article = onPageTemplate.querySelector('article');
// removes red highlght from active pin
var removeActive = function () {
  var pin = document.querySelector('.map__pin--active');
  if (pin !== null) {
    pin.classList.remove('map__pin--active');
  }
};

var hideArticle = function () {
  var removePopup = document.querySelector('.map__card');
  if (removePopup !== null) {
    mapContainer.removeChild(removePopup);
  }
};
var renderArticle = function (offerVariable) {
  var mapElement = article.cloneNode(true);
  var paragraph = mapElement.querySelectorAll('p');
  mapElement.querySelector('h3').textContent = offerVariable.offer.title;
  paragraph[0].textContent = offerVariable.offer.address;
  mapElement.querySelector('.popup__price').textContent = offerVariable.offer.price + ' \u20bd/ за ночь';
  mapElement.querySelector('h4').textContent = OFFER_TYPES_RUS[OFFER_TYPES.indexOf(offerVariable.offer.type)];
  paragraph[2].textContent = offerVariable.offer.rooms + ' для ' + offerVariable.offer.guests + ' гостей';
  paragraph[3].textContent = 'Заезд после ' + offerVariable.offer.checkin + ' , выезд до ' + offerVariable.offer.checkout;
  getFeaturesList(offerVariable.offer.features);
  paragraph[4].textContent = offerVariable.offer.description;
  mapElement.querySelector('.popup__avatar').setAttribute('src', offerVariable.author.avatar);
  var closePopup = mapElement.querySelector('.popup__close');
  closePopup.addEventListener('click', function () {
    closePopup.autofocus = false;
    removeActive();
    hideArticle();
  });
  closePopup.tabindex = '0';
  mapContainer.appendChild(mapElement);
};

var offerContstructor = function (obj, i) {
  var offerPin = document.createElement('BUTTON');
  offerPin.className = 'map__pin';
  offerPin.style.left = '' + obj[i].location.x + 'px';
  offerPin.style.top = '' + obj[i].location.y + 'px';
  offerPin.addEventListener('click', function () {
    removeActive();
    hideArticle();
    offerPin.classList.add('map__pin--active');
    renderArticle(obj[i]);
  });
  offerPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      removeActive();
      hideArticle();
    }
  });
  var image = document.createElement('img');
  image.style.width = '40px';
  image.style.height = '40px';
  image.style.draggable = 'false';
  image.src = obj[i].author.avatar;
  offerPin.tabindex = '0';
  offerPin.appendChild(image);
  return offerPin;
};

var createFragment = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < offerList.length; i++) {
    fragment.appendChild(offerContstructor(offerList, i));
  }
  sampleMapPin.appendChild(fragment);
};

var getFeaturesList = function (featrs) {
  var mapItem = onPageTemplate.cloneNode(true);
  var ulElement = mapItem.querySelector('.popup__features');
  var liFragment = document.createDocumentFragment();
  for (var i = 0; i <= featrs.length - 1; i++) {
    var newElement = document.createElement('li');
    newElement.className = 'feature feature--' + featrs[i];
    liFragment.appendChild(newElement);
  }
  ulElement.appendChild(liFragment);
};
// enable form on mouse remove
var mouseAction = mapContainer.querySelector('.map__pin--main');
var startForm = function () {
  form.classList.remove('notice__form--disabled');
  mapContainer.classList.remove('map--faded');
  createFragment();
  for (var k = 0; k < fieldset.length; k++) {
    fieldset[k].removeAttribute('disabled', 'disabled');
  }
};

mouseAction.addEventListener('mouseup', startForm);
mouseAction.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    startForm();
  }
});
// form validation
