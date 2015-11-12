'use strict';

angular.module('editorApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/editorApp', {
        templateUrl: 'editorApp/editor/editorMain.html',
        controller: 'EditorMainCtrl'
      });
  });
