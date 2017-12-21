'use strict';

(function () {
  var PIN_WIDTH = 40;
  var PIN_HEIGHT = 40;
  var PRICES = {
    low: 10000,
    high: 50000
  };
  var ENTER_KEYCODE = 13;
  var mapContainer = document.querySelector('.map');
  var sampleMapPin = mapContainer.querySelector('.map__pins');
  var form = document.querySelector('.notice__form');
  var fieldset = document.querySelectorAll('fieldset');
  var filter = document.querySelector('.map__filters');
  var housingType = filter.querySelector('#housing-type');
  var housingPrice = filter.querySelector('#housing-price');
  var housingRooms = filter.querySelector('#housing-rooms');
  var housingGuests = filter.querySelector('#housing-guests');
  var features = filter.querySelectorAll('#housing-features input[name="features"]');
  var mapItems = [];


  var removeActivePins = function () {
    var toRemove = sampleMapPin.querySelectorAll('.map__pin:not(.map__pin--main)');
    [].forEach.call(toRemove, function (mapPins) {
      sampleMapPin.removeChild(mapPins);
    });
  };

  var filterMapItems = function (evt) {
    var filtered = mapItems;
    var type = evt.target.id;
    var byValue = function (target, field) {
      if (evt.target.value !== 'any') {
        filtered = filtered.filter(function (offerData) {
          return offerData.offer[field].toString() === evt.target.value;
        });
      }
      return filtered;
    };
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
    switch (type) {
      case 'housing-type':
        byValue(housingType, 'type');
        break;
      case 'housing-rooms':
        byValue(housingRooms, 'rooms');
        break;
      case 'housing-guests':
        byValue(housingGuests, 'guests');
        break;
      case 'housing-price':
        byPrice();
        break;
      case 'housing-features':
        byFeatures();
        break;
    }
    // byPrice();
    // byFeatures();
    // console.log(filtered);
    window.showCard(filtered);
    return filtered;
  };
  filter.addEventListener('change', function (evt) {

    window.card.hideArticle();
    removeActivePins();
    filterMapItems(evt);
    // window.backend.debounce(filterMapItems(evt, filtered), 500);
  });

  // make fieldset inactive on start
  [].forEach.call(fieldset, function (item) {
    item.setAttribute('disabled', 'disabled');
  });
  // form start
  var mouseAction = mapContainer.querySelector('.map__pin--main');
  var startForm = function () {
    form.classList.remove('notice__form--disabled');
    mapContainer.classList.remove('map--faded');
    window.backend.load(onSuccess, onError);
    setInitialPosition();
    window.roomNumberChangeHandler();
    for (var k = 0; k < fieldset.length; k++) {
      fieldset[k].removeAttribute('disabled', 'disabled');
    }
  };

  var coords = form.querySelector('#address');
  var setInitialPosition = function () {
    var styles = window.getComputedStyle(mouseAction);
    coords.value = 'x: ' + parseInt(styles.left, 10) + ', y: ' + parseInt(styles.top, 10);
  };

  mouseAction.addEventListener('mouseup', startForm);
  mouseAction.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      startForm();
    }
  });

  mouseAction.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      var newY = mouseAction.offsetTop - shift.y;
      var newX = mouseAction.offsetLeft - shift.x;
      var coordsYOnForm;
      var coordsXOnForm = newX - PIN_WIDTH / 2;
      mouseAction.style.left = newX + 'px';
      if (newY > 500) {
        mouseAction.style.top = '500 px';
        coordsYOnForm = 500;
      } else if (newY <= 100) {
        mouseAction.style.top = '100 px';
        coordsYOnForm = 100;
      } else {
        mouseAction.style.top = newY + 'px';
        coordsYOnForm = newY - PIN_HEIGHT;
      }
      coords.value = 'x: ' + coordsXOnForm + ', y: ' + coordsYOnForm;
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var onError = function (message) {
    var messageBox = document.createElement('div');
    messageBox.style = 'z-index: 100; position: absolute; top: 35%; left: 50%; transform: translate(-50%, -50%); text-align: center; font-size: 30px; color: red; border: 1px solid red; background-color: #ffffff; padding: 10px 40px 10px 40px; border-radius: 5px;';
    messageBox.textContent = message;
    document.body.insertAdjacentElement('afterbegin', messageBox);
  };

  var onSuccess = function (data) {
    mapItems = data;
    // console.log(mapItems);
    window.showCard(data);
  };

  window.map = {
    form: form,
    fieldset: fieldset,
    mapContainer: mapContainer,
    sampleMapPin: sampleMapPin
  };
})();
