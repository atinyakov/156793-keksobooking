'use strict';

(function () {
  window.utils = {
    uploadImg: function (image, imgFormat, cb) {
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
    },
    debounce: function (func, interval) {
      var lastTimeout;

      return function () {
        clearTimeout(lastTimeout);
        lastTimeout = setTimeout(func, interval);
      };
    },
    clampValue: function (val, min, max) {
      return Math.max(min, Math.min(max, val));
    }
  };
}());
