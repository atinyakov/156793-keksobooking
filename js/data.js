'use strict';

(function () {
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
  window.data = {
    offerList: offerList,
    OFFER_TYPES: OFFER_TYPES,
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,
  };
})();
