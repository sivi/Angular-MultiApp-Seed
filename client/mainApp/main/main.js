'use strict';

angular.module('buildTestApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/mainApp', {
        templateUrl: 'mainApp/main/main.html',
        controller: 'MainCtrl'
      });
  });
