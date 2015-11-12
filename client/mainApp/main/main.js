'use strict';

angular.module('mainApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/mainApp', {
        templateUrl: 'mainApp/main/main.html',
        controller: 'MainCtrl'
      });
  });
