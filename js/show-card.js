'use strict';

(function () {
  var showCard = function (data) {
    var PINS_TO_SHOW = 5;
    var fragment = document.createDocumentFragment();
    data = data.slice(0, PINS_TO_SHOW);
    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(window.pin.offerContstructor(data, i));
    }
    window.map.sampleMapPin.appendChild(fragment);
  };
  window.showCard = showCard;
})();
