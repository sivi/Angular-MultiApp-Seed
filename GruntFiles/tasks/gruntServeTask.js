/**
 * Created by a on 11/9/2015.
 */
'use strict';
module.exports = function (grunt) {

  grunt.registerTask('serve', function (target) {
    grunt.log.writeln('target -->' + target);
    if (target === 'dist') {
      grunt.log.writeln('Running DIST!');
      return grunt.task.run(
        ['build', 'env:all', 'env:prod', 'express:prod', 'wait', 'open', 'express-keepalive']);
    }

    if (target === 'debug') {
      return grunt.task.run([
        'clean:server',
        'env:all',
        'injector:sass',
        'concurrent:server',
        'injector',
        'wiredep',
        'autoprefixer',
        'concurrent:debug'
      ]);
    }

    grunt.task.run([
      'clean:server',
      'env:all',
      'injector:sass',
      'concurrent:server',
      'injector',
      'wiredep',
      'autoprefixer',
      'express:dev',
      'wait',
      'open',
      'watch'
    ]);
  });

  grunt.registerTask('server', function () {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve']);
  });

  grunt.registerTask('serveDist', function () {
    grunt.log.writeln('Running DIST!');
    return grunt.task.run(
      ['build', 'env:all', 'env:prod', 'express:prod', 'wait', 'open', 'express-keepalive']);
  });

};

