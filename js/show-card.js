'use strict';

(function () {
  var showCard = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.data.offerList.length; i++) {
      fragment.appendChild(window.pin.offerContstructor(window.data.offerList, i));
    }
    window.map.sampleMapPin.appendChild(fragment);
  };
  window.showCard = showCard;
})();
