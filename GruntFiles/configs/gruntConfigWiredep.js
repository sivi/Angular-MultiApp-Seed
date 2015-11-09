/**
 * Created by a on 11/10/2015.
 */

'use strict';
module.exports = function (grunt) {
  grunt.registerTask('wiredepConfig', function () {
    grunt.config('wiredep', [{
      target: {
        src: ['<%= projectRoot.client %>/adminApp/index.html',
          '<%= projectRoot.client %>/editorApp/index.html',
          '<%= projectRoot.client %>/mainApp/index.html'],
        ignorePath: '<%= projectRoot.client %>/',
        exclude: [/bootstrap-sass-official/, /bootstrap.js/,
          '/json3/', '/es5-shim/', /bootstrap.css/, /font-awesome.css/]
      }
    }]);
  });
};
