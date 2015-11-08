'use strict';

angular.module('buildTestApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    var vm = this;

    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    },
    {
      'title': 'Admin App',
      'link': '/adminApp'
    },
    {
      'title': 'Editor App',
      'link': '/editorApp'
    },
    {
      'title': 'Main App',
      'link': '/mainApp'
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
