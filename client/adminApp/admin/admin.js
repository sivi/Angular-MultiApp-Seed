'use strict';

angular.module('buildTestApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/adminApp', {
        templateUrl: 'adminApp/admin/admin.html',
        controller: 'AdminCtrl'
      });
  });
