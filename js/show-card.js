'use strict';

(function () {
  var PINS_TO_SHOW = 5;
  window.showCard = function (data) {
    var fragment = document.createDocumentFragment();
    data = data.slice(0, PINS_TO_SHOW);
    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(window.createOffer(data, i));
    }
    window.map.sampleMapPin.appendChild(fragment);
  };
})();
