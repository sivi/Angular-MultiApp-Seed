(function() {
  'use strict';
  /*
   Editor App
   */

  angular.module('buildTestApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    //'btford.socket-io',
    'ui.bootstrap'
  ]);

  angular.module('buildTestApp').
    config(function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider.
      when('/mainApp', { // redirect outside of current app
        // http://stackoverflow.com/questions/19321765
        // /using-routeprovider-to-redirect-to-routes-outside-of-angular
        controller: function() {
          //console.log('switching to /mainApp');
          window.location.href = '/mainApp';
          window.location.reload(true);
        }}).
      when('/adminApp', { // redirect outside of current app
        // http://stackoverflow.com/questions/19321765
        // /using-routeprovider-to-redirect-to-routes-outside-of-angular
        controller: function() {
          window.location.href = '/adminApp';
        }}).
      otherwise({
        redirectTo: '/editorApp'
      });

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if (response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .run(function ($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$routeChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          event.preventDefault();
          $location.path('/login');
        }
      });
    });
  });
})();
