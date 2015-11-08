(function() {
  'use strict';
  /*
   Main App
   */

  angular.module('buildTestApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
  ]);

  angular.module('buildTestApp').
    config(function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider.
      otherwise({
        // while it may look idiotic, it was only way to work around ngRoute. Idea came from
        // http://stackoverflow.com/questions/19321765/using-routeprovider-to-redirect-to-routes-outside-of-angular
        controller : function() {
          var path = window.location.href;
          var target = window.location.protocol + '//' + window.location.host;
          if (path === (target + '/adminApp')) {
            window.location.replace(window.location.protocol + '/adminApp');
          }
          else if (path === (target + '/editorApp')) {
            window.location.replace(window.location.protocol + '/editorApp');
          }
          else {
            window.location.replace('/');
          }
        },
        template : '<div></div>'
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
