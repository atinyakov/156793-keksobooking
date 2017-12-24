'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500; // ms
  var lastTimeout;
  window.uploadImg = function (image, imgFormat, cb) {
    if (image) {
      var imageTitle = image.name.toLowerCase();
      var isSame = imgFormat.some(function (item) {
        return imageTitle.endsWith(item);
      });
      if (isSame && typeof cb === 'function') {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          cb(reader);
        });
        reader.readAsDataURL(image);
      }
    }
  };
  window.debounce = function (fun) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(fun, DEBOUNCE_INTERVAL);
  };
}());
