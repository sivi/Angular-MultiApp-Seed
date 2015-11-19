'use strict';

angular.module('adminApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/adminApp', {
        templateUrl: 'adminApp/admin/admin.html',
        controller: 'AdminCtrl'
      });
  });
