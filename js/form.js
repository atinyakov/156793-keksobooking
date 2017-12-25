'use strict';
(function () {
  // form validation
  var ROOMS_CAPACITY = {
    '1': ['1'],
    '2': ['2', '1'],
    '3': ['3', '2', '1'],
    '100': ['0']
  };
  var form = document.querySelector('.notice__form');
  var userSelectCheckIn = form.querySelector('#timein');
  var userSelectCheckout = form.querySelector('#timeout');
  var submit = form.querySelector('button');
  var userSelectType = form.querySelector('#type');
  var userPrice = form.querySelector('#price');
  var roomType = ['bungalo', 'flat', 'house', 'palace'];
  var minPrice = [0, 1000, 5000, 10000];
  var roomNumber = form.querySelector('#room_number');
  var capacity = form.querySelector('#capacity');
  var newElem = document.querySelector('#submit_message'); // element to display an error
  var fieldset = document.querySelectorAll('fieldset');

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

  var onLoadHandler = function () {
    form.reset();
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

  var removeFadeOnStart = function () {
    form.classList.remove('notice__form--disabled');
    [].forEach.call(fieldset, function (item) {
      item.style.disabled = false;
    });
  };
  // form submit handler
  submit.addEventListener('onsubmit', function () {
    window.backend.save(new FormData(form), onLoadHandler, errorHandler);
    roomNumberChangeHandler();
  });
  // submit status message
  newElem.style = 'margin: auto; text-align: center; font-size: 20px; color: red; border: 1px solid red; padding: 10px 20px 10px 20px; border-radius: 5px; visibility: hidden';

  // hides message from form
  var clearMessage = function (el) {
    el.style.visibility = 'hidden';
  };
  roomNumberChangeHandler();
  roomNumber.addEventListener('change', roomNumberChangeHandler);
  window.dropDownChangeHandler(userSelectCheckIn, userSelectCheckout, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], syncValuesChekInVsCheckout, true);
  window.dropDownChangeHandler(userSelectType, userPrice, roomType, minPrice, syncValuesRoomsVsGuests, false);

  // make fieldset inactive on start
  [].forEach.call(fieldset, function (item) {
    item.style.disabled = true;
  });
  window.form = {
    form: form,
    roomNumberChangeHandler: roomNumberChangeHandler,
    removeFadeOnStart: removeFadeOnStart
  };

})();
