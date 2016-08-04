(function () {
  'use strict';

  angular
    .module('neap-protractor-sass-gulp')
    .controller('MainController', MainController);

  function MainController() {
    var vm = this;
    vm.text = 'this is some text from the main controller';
  }
})();
