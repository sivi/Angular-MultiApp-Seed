'use strict';

describe('Controller: EditorMainCtrl', function () {

  // load the controller's module
  beforeEach(module('editorApp'));
  //beforeEach(module('socketMock'));
  describe('editorApp', function() {

    it('should ....', inject(function($controller) {
      //spec body
      var appInstance = angular.module('editorApp');
      console.log('editorApp ' + appInstance);
      expect(appInstance).toBeDefined();
    }));

  });
  var EditorMainCtrl,
      scope,
      $httpBackend,
      $rootScope,
      $controller;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, _$controller_, _$rootScope_) {
    $rootScope = _$rootScope_;
    $controller = _$controller_;
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/things')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

    scope = $rootScope.$new();
    EditorMainCtrl = $controller('EditorMainCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of things to the scope', function () {
    $httpBackend.flush();
    expect(scope.awesomeThings.length).toBe(4);
  });
});
