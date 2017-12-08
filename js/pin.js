'use strict';

(function () {

  var offerContstructor = function (obj, i) {
    var offerPin = document.createElement('BUTTON');
    offerPin.className = 'map__pin';
    offerPin.style.left = '' + obj[i].location.x + 'px';
    offerPin.style.top = '' + obj[i].location.y + 'px';
    offerPin.addEventListener('click', function () {
      window.card.removeActive();
      window.card.hideArticle();
      offerPin.classList.add('map__pin--active');
      window.card.renderArticle(obj[i]);
    });
    var image = document.createElement('img');
    image.style.width = '40px';
    image.style.height = '40px';
    image.style.draggable = 'false';
    image.src = obj[i].author.avatar;
    offerPin.tabIndex = 1;
    offerPin.appendChild(image);
    return offerPin;
  };
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.data.ESC_KEYCODE) {
      window.card.removeActive();
      window.card.hideArticle();
    }
  });
  var createFragment = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.data.offerList.length; i++) {
      fragment.appendChild(offerContstructor(window.data.offerList, i));
    }
    window.map.sampleMapPin.appendChild(fragment);
  };

  window.pin = {
    createFragment: createFragment,
    offerContstructor: offerContstructor
  };
})();
