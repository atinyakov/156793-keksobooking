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
  window.map = {
    form: form,
    fieldset: fieldset,
    mapContainer: mapContainer,
    sampleMapPin: sampleMapPin
  };
})();
