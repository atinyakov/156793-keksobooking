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
  // removes red highlght from active pin
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

  window.map = {
    form: form,
    fieldset: fieldset,
    mapContainer: mapContainer,
    sampleMapPin: sampleMapPin
  };
})();
