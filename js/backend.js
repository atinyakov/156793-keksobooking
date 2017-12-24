'use strict';

(function () {
  var SERVER_URL = 'https://1510.dump.academy/keksobooking';
  var TIMEOUT_10SEC = 10000;
  var OK_STATUS = 200;
  var loadHandler = function (onLoad, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === OK_STATUS) {
        onLoad(xhr.response);
      } else {
        errorHandler('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      errorHandler('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      errorHandler('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_10SEC; // 10s
    return xhr;
  };

  window.backend = {
    save: function (data, onLoad, errorHandler) {
      var xhr = loadHandler(onLoad, errorHandler);
      xhr.open('POST', SERVER_URL);
      xhr.send(data);
    },
    load: function (onLoad, errorHandler) {
      var xhr = loadHandler(onLoad, errorHandler);
      xhr.open('GET', SERVER_URL + '/data');
      xhr.send();
    }
  };
})();
