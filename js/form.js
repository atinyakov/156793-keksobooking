'use strict';
(function () {
  // form validation
  var userSelectCheckIn = window.map.form.querySelector('#timein');
  var userSelectCheckout = window.map.form.querySelector('#timeout');
  // syncs checkin with checkout
  var syncValues = function (element, value) {
    element.value = value;
  };

  window.synchronizeFields.synchronizeFields(userSelectCheckIn, userSelectCheckout, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], syncValues, true);

  // syncs type with price
  var userSelectType = window.map.form.querySelector('#type');
  var userPrice = window.map.form.querySelector('#price');
  var roomType = ['bungalo', 'flat', 'house', 'palace'];
  var minPrice = [0, 1000, 5000, 10000];

  window.synchronizeFields.synchronizeFields(userSelectType, userPrice, roomType, minPrice, syncValues, false);

  var roomNumber = window.map.form.querySelector('#room_number');
  var capacity = window.map.form.querySelector('#capacity');

  var ROOMS_CAPACITY = {
    '1': ['1'],
    '2': ['2', '1'],
    '3': ['3', '2', '1'],
    '100': ['0']
  };
  var roomNumberChangeHandler = function () {
    if (capacity.options.length > 0) {
      [].forEach.call(capacity.options, function (item) {
        item.selected = (ROOMS_CAPACITY[roomNumber.value][0] === item.value) ? true : false;
        item.hidden = (ROOMS_CAPACITY[roomNumber.value].indexOf(item.value) >= 0) ? false : true;
      });
    }
  };
  roomNumber.addEventListener('change', roomNumberChangeHandler);
})();
