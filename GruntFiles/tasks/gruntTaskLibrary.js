/**
 * Created by a on 11/9/2015.
 */

'use strict';
module.exports = function (grunt) {

  // Used for delaying livereload until after server has restarted
  grunt.registerTask('wait', function () {
    grunt.log.ok('Waiting for server reload...');

    var done = this.async();

    setTimeout(function () {
      grunt.log.writeln('Done waiting!');
      done();
    }, 1500);
  });

  grunt.registerTask('express-keepalive', 'Keep grunt running', function() {
    this.async();
  });


  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'injector:sass',
    'concurrent:dist',
    'injector',
    'wiredep',
    'useminPrepare',
    'useminFixGeneratedConcatConfig',
    'autoprefixer',
    'ngtemplates',
    'templatesFixGeneratedConcatConfig',
    'concat',
    'ngAnnotate',
    'copy:dist',
    'cdnify',
    'cssmin',
    'uglify',
    'filerev',
    'usemin'
  ]);

};
