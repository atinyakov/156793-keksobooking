'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500; // ms
  var PRICES = {
    low: 10000,
    high: 50000
  };

  var filter = document.querySelector('.map__filters');
  var housingType = filter.querySelector('#housing-type');
  var housingPrice = filter.querySelector('#housing-price');
  var housingRooms = filter.querySelector('#housing-rooms');
  var housingGuests = filter.querySelector('#housing-guests');
  var filteredOffers = [];

  var removeActivePins = function () {
    var toRemove = window.map.sampleMapPin.querySelectorAll('.map__pin:not(.map__pin--main)');
    [].forEach.call(toRemove, function (mapPins) {
      window.map.sampleMapPin.removeChild(mapPins);
    });
  };
  filteredOffers = window.map.mapItems;

  var filterByPrice = function () {
    if (housingPrice.value !== 'any') {
      filteredOffers = filteredOffers.filter(function (offerData) {
        var filterValues = {
          'middle': offerData.offer.price >= PRICES.low && offerData.offer.price < PRICES.high,
          'low': offerData.offer.price < PRICES.low,
          'high': offerData.offer.price >= PRICES.high
        };
        return filterValues[housingPrice.value];
      });
    }
    return filteredOffers;
  };

  var filterByValue = function (selector, field) {
    if (selector.value !== 'any') {
      filteredOffers = filteredOffers.filter(function (offerData) {
        return offerData.offer[field].toString() === selector.value;
      });
    }
    return filteredOffers;
  };

  var filterByFeatures = function () {
    var features = filter.querySelectorAll('#housing-features input[name="features"]:checked');
    [].forEach.call(features, function (item) {
      filteredOffers = filteredOffers.filter(function (offerData) {
        return offerData.offer.features.indexOf(item.value) >= 0;
      });
    });
    return filteredOffers;
  };

  var filterMapItems = function () {
    window.card.hideArticle();
    removeActivePins();
    filteredOffers = window.map.mapItems();
    filterByValue(housingType, 'type');
    filterByPrice();
    filterByValue(housingRooms, 'rooms');
    filterByValue(housingGuests, 'guests');
    filterByFeatures();
    window.showCard(filteredOffers);
  };

  var debounce = window.utils.debounce(filterMapItems, DEBOUNCE_INTERVAL);

  filter.addEventListener('change', debounce);

}());
