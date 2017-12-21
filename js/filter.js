'use strict';

(function () {
  var PRICES = {
    low: 10000,
    high: 50000
  };

  var filter = document.querySelector('.map__filters');
  var housingType = filter.querySelector('#housing-type');
  var housingPrice = filter.querySelector('#housing-price');
  // var housingRooms = filter.querySelector('#housing-rooms');
  // var housingGuests = filter.querySelector('#housing-guests');
  var features = filter.querySelectorAll('#housing-features input[name="features"]');

  var removeActivePins = function () {
    var toRemove = window.map.sampleMapPin.querySelectorAll('.map__pin:not(.map__pin--main)');
    [].forEach.call(toRemove, function (mapPins) {
      window.map.sampleMapPin.removeChild(mapPins);
    });
  };
  var filtered = window.map.mapItems;
  console.log(filtered);
  var byPrice = function () {
    if (housingPrice.value !== 'any') {
      filtered = filtered.filter(function (offerData) {
        var filterValues = {
          'middle': offerData.offer.price >= PRICES.low && offerData.offer.price < PRICES.high,
          'low': offerData.offer.price < PRICES.low,
          'high': offerData.offer.price >= PRICES.high
        };
        return filterValues[housingPrice.value];
      });
    }
  };

  var byValue = function (evt, target, field) {
    if (evt.target.value !== 'any') {
      filtered = filtered.filter(function (offerData) {
        return offerData.offer[field].toString() === evt.target.value;
      });
    } else {
      console.log(filtered);
    }
    return filtered;
  };

  var byFeatures = function () {
    [].forEach.call(features, function (item) {
      if (item.checked) {
        filtered = filtered.filter(function (offerData) {
          return offerData.offer.features.indexOf(item.value) >= 0;
        });
      }
    });
    return filtered;
  };

  var filterMapItems = function (evt) {
    byValue(evt, housingType, 'type');
    // byValue(evt, housingRooms, 'rooms');
    // byValue(evt, housingGuests, 'guests');
    // byPrice();
    // byFeatures();
    window.showCard.showCard(filtered);
    return filtered;
  };
  console.log(window.map.offers);

  // switch (type) {
  //   case 'housing-type':
  //     byValue(housingType, 'type');
  //     break;
  //   case 'housing-rooms':
  //     byValue(housingRooms, 'rooms');
  //     break;
  //   case 'housing-guests':
  //     byValue(housingGuests, 'guests');
  //     break;
  //   case 'housing-price':
  //     byPrice();
  //     break;
  //   case 'housing-features':
  //     byFeatures();
  //     break;
  // }

  filter.addEventListener('change', function (evt) {
    window.card.hideArticle();
    removeActivePins();
    filterMapItems(evt);
    // window.backend.debounce(filterMapItems(evt, filtered), 500);
  });
}());
