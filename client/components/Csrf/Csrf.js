/**
 * Created by a on 11/24/2015.
 */
(function() {
  'use strict';
  angular.module('componentsModule')
    .factory('CsrfService', ['$resource',
      function CsrfService($resource) {
        // $resource(url, [paramDefaults], [actions], options);
        return $resource('/api/csrf', {}, {
        });
      }]);
})();

