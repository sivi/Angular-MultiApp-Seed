/**
 * Created by a on 11/10/2015.
 */

'use strict';
module.exports = function (grunt) {
  grunt.registerTask('sassConfig', function () {
    grunt.config('sass', [{
      server: {
        options: {
          loadPath: [
            '<%= projectRoot.client %>/bower_components',
            '<%= projectRoot.client %>/adminApp',
            '<%= projectRoot.client %>/editorApp',
            '<%= projectRoot.client %>/mainApp',
            '<%= projectRoot.client %>/components'
          ],
          compass: false
        },
        files: {
          '.tmp/adminApp/app.css' : '<%= projectRoot.client %>/adminApp/app.scss',
          '.tmp/editorApp/app.css' : '<%= projectRoot.client %>/editorApp/app.scss',
          '.tmp/mainApp/app.css' : '<%= projectRoot.client %>/mainApp/app.scss'
        }
      }
    }]);
  });
};
