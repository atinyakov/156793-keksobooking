'use strict';
(function () {
  // form validation
  var userSelectCheckIn = window.map.form.querySelector('#timein');
  var userSelectCheckout = window.map.form.querySelector('#timeout');
  // syncs checkin with checkout
  userSelectCheckIn.addEventListener('change', function () {
    userSelectCheckout.value = userSelectCheckIn.value;
  });
  userSelectCheckout.addEventListener('change', function () {
    userSelectCheckIn.value = userSelectCheckout.value;
  });

  var typeToMinPrice = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };
  // syncs type with price
  var userSelectType = window.map.form.querySelector('#type');
  var userPrice = window.map.form.querySelector('#price');
  userSelectType.addEventListener('change', function () {
    for (var userType in typeToMinPrice) {
      if (userType === userSelectType.value) {
        userPrice.min = typeToMinPrice[userType];
      }
    }
  });

  var roomNumber = window.map.form.querySelector('#room_number');
  var capacity = window.map.form.querySelector('#capacity');
  // var options = selectGuests.querySelectorAll('option');

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
