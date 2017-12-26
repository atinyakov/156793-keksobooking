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

  var mapItems;
  var mouseAction = mapContainer.querySelector('.map__pin--main');
  var coords = window.form.form.querySelector('#address');
  var startCoords;

  var setInitialPosition = function () {
    var styles = window.getComputedStyle(mouseAction);
    coords.value = 'x: ' + parseInt(styles.left, 10) + ', y: ' + parseInt(styles.top, 10);
  };
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

  // form start
  var startForm = function () {
    window.form.removeFadeOnStart();
    mapContainer.classList.remove('map--faded');
    window.backend.load(onSuccess, onError);
    setInitialPosition();
    window.form.onRoomNumberChange();
  };

  mouseAction.addEventListener('mouseup', startForm);
  mouseAction.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      startForm();
    }
  });

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    var newY = mouseAction.offsetTop - shift.y;
    var newX = mouseAction.offsetLeft - shift.x;
    var coordsYOnForm = newY - PIN_HEIGHT;
    var coordsXOnForm = newX - PIN_WIDTH / 2;

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    coordsXOnForm = window.utils.clampValue(newX, MIN_X, MAX_X);
    coordsYOnForm = window.utils.clampValue(newY, MIN_Y, MAX_Y);
    coords.value = 'x: ' + coordsXOnForm + ', y: ' + coordsYOnForm;
    mouseAction.style.left = coordsXOnForm + 'px';
    mouseAction.style.top = coordsYOnForm + 'px';
  };
  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  mouseAction.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.map = {
    mapContainer: mapContainer,
    sampleMapPin: sampleMapPin,
    mapItems: function () {
      return mapItems.slice(0);
    }
  };
})();
