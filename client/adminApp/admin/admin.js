'use strict';

angular.module('buildTestApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/admin', {
        templateUrl: 'adminApp/admin/admin.html',
        controller: 'AdminCtrl'
      });
  });
