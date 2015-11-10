/**
 * Created by a on 11/10/2015.
 */

'use strict';
module.exports = function (grunt) {
  grunt.registerTask('jadeConfig', function () {
    var appFolders = grunt.config('projectAppFolders');
    var verboseConfigUpdates = grunt.config('verboseConfigUpdates');

    var foldersSequenceString = '';
    for (var i = 0; i < appFolders.length; i++) {
      if (foldersSequenceString !== '') {
        foldersSequenceString += ',';
      }
      foldersSequenceString += appFolders[i];
    }

    grunt.config('jade', {
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
            '{' + foldersSequenceString + ',components,shared}/**/*.jade'
          ],
          dest: '.tmp',
          ext: '.html'
        }]
      }
    });
    if (verboseConfigUpdates) {
      grunt.log.writeln('Config -->' + JSON.stringify(grunt.config('jade')));
    }
  });
};
