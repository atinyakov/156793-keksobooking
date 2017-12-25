'use strict';
(function () {
  // form validation
  var ROOMS_CAPACITY = {
    '1': ['1'],
    '2': ['2', '1'],
    '3': ['3', '2', '1'],
    '100': ['0']
  };

  var userSelectCheckIn = window.map.form.querySelector('#timein');
  var userSelectCheckout = window.map.form.querySelector('#timeout');
  var submit = window.map.form.querySelector('button');
  var userSelectType = window.map.form.querySelector('#type');
  var userPrice = window.map.form.querySelector('#price');
  var roomType = ['bungalo', 'flat', 'house', 'palace'];
  var minPrice = [0, 1000, 5000, 10000];
  var roomNumber = window.map.form.querySelector('#room_number');
  var capacity = window.map.form.querySelector('#capacity');
  var newElem = document.querySelector('#submit_message'); // element to display an error

  // func syncs checkin with checkout
  var syncValuesChekInVsCheckout = function (element, value) {
    element.value = value;
  };
  // syncs type with price
  var syncValuesRoomsVsGuests = function (element, value) {
    element.placeholder = value;
    element.min = value;
  };

  // sync rooms with guests
  var roomNumberChangeHandler = function () {
    if (capacity.options.length > 0) {
      [].forEach.call(capacity.options, function (item) {
        item.selected = (ROOMS_CAPACITY[roomNumber.value][0] === item.value) ? true : false;
        item.hidden = (ROOMS_CAPACITY[roomNumber.value].indexOf(item.value) >= 0) ? false : true;
      });
    }
  };
  roomNumberChangeHandler();
  roomNumber.addEventListener('change', roomNumberChangeHandler);
  // hides message from form
  var clearMessage = function (el) {
    el.style.visibility = 'hidden';
  };

  var onLoadHandler = function () {
    window.map.form.reset();
    roomNumberChangeHandler();
    newElem.style.color = '#108a02';
    newElem.style.visibility = 'visible';
    newElem.textContent = 'Объявление успешно опубликовано';
    setTimeout(function () {
      clearMessage(newElem);
    }, 5000);
  };

  var errorHandler = function (error) {
    newElem.style.color = 'red';
    newElem.textContent = error;
    setTimeout(function () {
      clearMessage(newElem);
    }, 5000);
  };

  // form submit handler
  submit.addEventListener('onsubmit', function () {
    window.backend.save(new FormData(window.map.form), onLoadHandler, errorHandler);
    roomNumberChangeHandler();
  });
  // submit status message
  newElem.style = 'margin: auto; text-align: center; font-size: 20px; color: red; border: 1px solid red; padding: 10px 20px 10px 20px; border-radius: 5px; visibility: hidden';

  window.dropDownChangeHandler(userSelectCheckIn, userSelectCheckout, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], syncValuesChekInVsCheckout, true);
  window.dropDownChangeHandler(userSelectType, userPrice, roomType, minPrice, syncValuesRoomsVsGuests, false);

  window.roomNumberChangeHandler = roomNumberChangeHandler;
})();
