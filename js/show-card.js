'use strict';

(function () {
  var showCard = function (data) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(window.pin.offerContstructor(data, i));
    }
    window.map.sampleMapPin.appendChild(fragment);
  };
  window.showCard = showCard;
})();
