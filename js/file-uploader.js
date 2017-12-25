'use strict';

(function () {
  var IMG_TYPES = ['jpg', 'jpeg', 'png', 'gif'];
  var userpicSelect = document.querySelector('#avatar');
  var userpicBox = document.querySelector('.notice__preview  img');
  var imagePicker = document.querySelector('#images');
  var offerpicsBox = document.querySelector('.form__photo-container');
  // site visitors cnage their userpic
  var onUserpicChange = function () {
    var file = userpicSelect.files[0];
    window.utils.uploadImg(file, IMG_TYPES, function (reader) {
      userpicBox.src = reader.result;
    });
  };
  // site visitors upload their pictures of an offer
  var loadPics = function (offerPics) {
    offerPics.forEach(function (picture) {
      window.utils.uploadImg(picture, IMG_TYPES, function (reader) {
        var image = document.createElement('img');
        image.src = reader.result;
        image.classList.add('user__pic');
        offerpicsBox.appendChild(image);
      });
    });
  };

  userpicSelect.addEventListener('change', onUserpicChange);
  imagePicker.addEventListener('change', function () {
    var offerPics = [].map.call(imagePicker.files, function (picture) {
      return picture;
    });
    loadPics(offerPics);
  });
}());
