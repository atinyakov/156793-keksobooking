'use strict';
(function () {
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
  var CURRENCY_RUR = '\u20bd/';
  var removeActive = function () {
    var pin = document.querySelector('.map__pin--active');
    if (pin !== null) {
      pin.classList.remove('map__pin--active');
    }
  };
  var hideArticle = function () {
    var removePopup = document.querySelector('.map__card');
    if (removePopup !== null) {
      window.map.mapContainer.removeChild(removePopup);
    }
  };

  var pageTemplate = document.querySelector('template').content;
  pageTemplate.querySelector('.popup__features').innerHTML = '';
  var article = pageTemplate.querySelector('article');

  var getFeaturesList = function (mapElement, featrs) {
    var ulElement = mapElement.querySelector('.popup__features');
    var liFragment = document.createDocumentFragment();
    for (var i = 0; i <= featrs.length - 1; i++) {
      var newElement = document.createElement('li');
      newElement.className = 'feature feature--' + featrs[i];
      liFragment.appendChild(newElement);
    }
    return ulElement.appendChild(liFragment);
  };
  var renderArticle = function (offerVariable) {
    var mapElement = article.cloneNode(true);
    var paragraph = mapElement.querySelectorAll('p');
    mapElement.querySelector('h3').textContent = offerVariable.offer.title;
    paragraph[0].textContent = offerVariable.offer.address;
    mapElement.querySelector('.popup__price').textContent = offerVariable.offer.price + ' ' + CURRENCY_RUR + '  за ночь';
    mapElement.querySelector('h4').textContent = OFFER_TYPES_RUS[OFFER_TYPES.indexOf(offerVariable.offer.type)];
    paragraph[2].textContent = offerVariable.offer.rooms + ' для ' + offerVariable.offer.guests + ' гостей';
    paragraph[3].textContent = 'Заезд после ' + offerVariable.offer.checkin + ' , выезд до ' + offerVariable.offer.checkout;
    getFeaturesList(mapElement, offerVariable.offer.features);
    paragraph[4].textContent = offerVariable.offer.description;
    mapElement.querySelector('.popup__avatar').src = offerVariable.author.avatar;
    var closePopup = mapElement.querySelector('.popup__close');
    closePopup.addEventListener('click', function () {
      closePopup.autofocus = false;
      removeActive();
      hideArticle();
    });
    closePopup.tabIndex = 1;
    window.map.mapContainer.appendChild(mapElement);
  };

  window.card = {
    renderArticle: renderArticle,
    removeActive: removeActive,
    hideArticle: hideArticle
  };
}());
