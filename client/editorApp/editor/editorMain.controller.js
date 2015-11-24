(function() {
  'use strict';

  angular.module('editorApp').
    controller('EditorMainCtrl', EditorMainCtrl);

  EditorMainCtrl.$inject = ['$scope', '$http'];

  function EditorMainCtrl($scope, $http) {
    $scope.awesomeThings = [];

    console.log('EditorMainCtrl constructor');

    $http.get('/api/things').success(function (awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      //socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.addThing = function () {
      if ($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', {name: $scope.newThing});
      $scope.newThing = '';
    };

    $scope.deleteThing = function (thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      console.log('DESTROY editorMain');
      //socket.unsyncUpdates('thing');
    });

    $scope.current = 5;
    $scope.getSelectedRating = function(rating) {
      alert(rating);
    };

  }

})();
