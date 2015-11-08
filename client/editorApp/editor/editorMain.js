'use strict';

angular.module('buildTestApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/editorApp', {
        templateUrl: 'editorApp/editor/editorMain.html',
        controller: 'EditorMainCtrl'
      });
  });
