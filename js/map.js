'use strict';

(function () {
  var PIN_WIDTH = 40;
  var PIN_HEIGHT = 40;
  var MAX_Y = 500;
  var MIN_Y = 100;
  var MAX_X = 1100;
  var MIN_X = 100;
  var ENTER_KEYCODE = 13;
  var mapContainer = document.querySelector('.map');
  var sampleMapPin = mapContainer.querySelector('.map__pins');
  var form = document.querySelector('.notice__form');
  var fieldset = document.querySelectorAll('fieldset');
  var mapItems;

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

      if (newY > MAX_Y) {
        mouseAction.style.top = '500 px';
        coordsYOnForm = MAX_Y;
      } else if (newY <= MIN_Y) {
        mouseAction.style.top = '100 px';
        coordsYOnForm = MIN_Y;
      } else {
        mouseAction.style.top = newY + 'px';
        coordsYOnForm = newY - PIN_HEIGHT;
      }

      if (newX > MAX_X) {
        mouseAction.style.left = '1000 px';
        coordsXOnForm = MAX_X;
      } else if (newX <= MIN_X) {
        mouseAction.style.left = '0 px';
        coordsXOnForm = MIN_X;
      } else {
        mouseAction.style.left = newX + 'px';
        coordsXOnForm = newX - PIN_HEIGHT;
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
    window.showCard(data);
  };

  window.map = {
    form: form,
    fieldset: fieldset,
    mapContainer: mapContainer,
    sampleMapPin: sampleMapPin,
    mapItems: function () {
      return mapItems.slice(0);
    }
  };
})();
