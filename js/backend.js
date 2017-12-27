'use strict';

(function () {
  var SERVER_URL = 'https://1510.dump.academy/keksobooking';
  var TIMEOUT_10SEC = 10000;
  var OK_STATUS = 200;
  var onContentLoad = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === OK_STATUS) {
        onLoad(xhr.response);
      } else {
        onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_10SEC; // 10s
    return xhr;
  };

  window.backend = {
    save: function (data, onLoad, onError) {
      var xhr = onContentLoad(onLoad, onError);
      xhr.open('POST', SERVER_URL);
      xhr.send(data);
    },
    load: function (onLoad, onError) {
      var xhr = onContentLoad(onLoad, onError);
      xhr.open('GET', SERVER_URL + '/data');
      xhr.send();
    }
  };
})();
