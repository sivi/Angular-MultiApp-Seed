/**
 * Created by a on 11/11/2015.
 */
module.exports = function (grunt) {
  grunt.registerTask('concurentConfig', function () {

    var verboseConfigUpdates = grunt.config('verboseConfigUpdates');
    var runImageMin = grunt.config('runImageMin');
    var configTemplate = {
      server: [
        'jade',
        'sass'
      ],
      test: [
        'jade',
        'sass'
      ],
      debug: {
        tasks: [
          'nodemon',
          'node-inspector'
        ],
        options: {
          logConcurrentOutput: true
        }
      },
      dist: [
        'jade',
        'sass',
        //'imagemin',
        'svgmin'
      ]
    };

    if (runImageMin) {
      configTemplate.dist.push('imagemin');
    }

    grunt.config('concurrent', configTemplate);
    if (verboseConfigUpdates) {
      grunt.log.writeln('Config -->' + JSON.stringify(grunt.config('concurrent')));
    }
  });
};
