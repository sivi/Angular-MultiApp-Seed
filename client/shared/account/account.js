'use strict';

angular.module('sharedControllers')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'shared/account/login/login.html',
        controller: 'LoginCtrl'
      })
      .when('/signup', {
        templateUrl: 'shared/account/signup/signup.html',
        controller: 'SignupCtrl'
      })
      .when('/settings', {
        templateUrl: 'shared/account/settings/settings.html',
        controller: 'SettingsCtrl',
        authenticate: true
      });
  });
