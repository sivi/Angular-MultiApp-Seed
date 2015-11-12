'use strict';

angular.module('administrationApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/adminApp', {
        templateUrl: 'adminApp/admin/admin.html',
        controller: 'AdminCtrl'
      });
  });
