'use strict';

(function () {
  window.synchronizeFields = function (field1, field2, data1, data2, cb, twoWaySync) {
    field1.addEventListener('change', function (evt) {
      var index = data1.indexOf(evt.target.value);
      cb(field2, data2[index]);
    });
    if (twoWaySync) {
      field2.addEventListener('change', function (evt) {
        var index = data2.indexOf(evt.target.value);
        cb(field1, data1[index]);
      });
    }
  };
})();
