'use strict';

angular.module('componentsModule')
  .controller('NavbarCtrl', function ($scope, $location, Auth, $window) {
    var vm = this;
    var host = window.location.protocol;
    $scope.menu = [{
      'title': 'Home',
      'link': host + '/'
    },
    {
      'title': 'Admin App',
      'link': host + '/adminApp'
    },
    {
      'title': 'Editor App',
      'link': host + '/editorApp'
    },
    {
      'title': 'Main App',
      'link': host + '/mainApp'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };

    vm.changeLocation = function(url) {
      console.log('switching to ' + url);
      window.location.href = url;
      window.location.reload(true);
    };
  });
