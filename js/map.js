'use strict';

(function () {
  var mapContainer = document.querySelector('.map');
  var sampleMapPin = mapContainer.querySelector('.map__pins');
  var form = document.querySelector('.notice__form');
  var fieldset = document.querySelectorAll('fieldset');
  // make fieldset inactive on start
  for (var j = 0; j < fieldset.length; j++) {
    fieldset[j].setAttribute('disabled', 'disabled');
  }
  // form start
  var mouseAction = mapContainer.querySelector('.map__pin--main');
  var startForm = function () {
    form.classList.remove('notice__form--disabled');
    mapContainer.classList.remove('map--faded');
    window.pin.createFragment();
    for (var k = 0; k < fieldset.length; k++) {
      fieldset[k].removeAttribute('disabled', 'disabled');
    }
  };

  mouseAction.addEventListener('mouseup', startForm);
  mouseAction.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.data.ENTER_KEYCODE) {
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
      var coords = form.querySelector('#address');
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
      var coordsXOnForm = newX - 40 / 2;
      mouseAction.style.left = newX + 'px';
      if (newY > 650) {
        mouseAction.style.top = '650 px';
        coordsYOnForm = 650;
      } else if (newY <= 100) {
        mouseAction.style.top = '100 px';
        coordsYOnForm = 100;
      } else {
        mouseAction.style.top = newY + 'px';
        coordsYOnForm = newY - 40;
      }
      coords.value = coordsXOnForm + ',' + coordsYOnForm;
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.map = {
    form: form,
    fieldset: fieldset,
    mapContainer: mapContainer,
    sampleMapPin: sampleMapPin
  };
})();
