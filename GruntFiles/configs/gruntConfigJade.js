/**
 * Created by a on 11/10/2015.
 */


'use strict';
module.exports = function (grunt) {
  grunt.registerTask('jadeConfig', function () {
    grunt.config('jade', [{
      compile: {
        options: {
          data: {
            debug: false
          }
        },
        files: [{
          expand: true,
          cwd: '<%= projectRoot.client %>',
          src: [
            '{adminApp,editorApp,mainApp,components,shared}/**/*.jade'
          ],
          dest: '.tmp',
          ext: '.html'
        }]
      }
    }]);
  });
};
