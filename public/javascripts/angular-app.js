(function () {
  'use strict';

  angular
    .module('neap-stack', ['ui.router'])
    .config(config);

  /* @ngInject */
  function config ($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'javascripts/main/main.html',
        controllerAs: 'main',
        controller: 'MainController',
      });
      $urlRouterProvider.otherwise('/');
      $locationProvider.html5Mode(true);
}})();
