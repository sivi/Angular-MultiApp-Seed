/**
 * Created by a on 11/14/2015.
 */
(function() {
  'use strict';
  //
  //  -----------------
  //
  angular.module('editorApp').
      controller('SurveyEditorMainController', SurveyEditorMainController);

  SurveyEditorMainController.$inject = ['$scope'];
  function SurveyEditorMainController($scope) {
    var vm = this;
    console.log('SurveyEditorMainController');
    $scope.One = {
      surveyEditor: null,
      parentController: vm
    };

    vm.addNew = function() {
      $scope.One.surveyEditor.addNewSurvey();
    };
    vm.editExisting = function() {
      $scope.One.surveyEditor.editExistingSurvey();
    };
    vm.commitChanges = function() {
      alert('vm.commitChanges');
    };

    $scope.current = 5;
    $scope.getSelectedRating = function(rating) {
      alert(rating);
    };

  }

})();
