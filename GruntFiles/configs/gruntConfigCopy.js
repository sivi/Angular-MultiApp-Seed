/**
 * Created by a on 11/9/2015.
 */

'use strict';
module.exports = function (grunt) {
  grunt.registerTask('copyConfig', function () {

    var appFolders = grunt.config('projectAppFolders');
    var verboseConfigUpdates = grunt.config('verboseConfigUpdates');

    var foldersSequenceString = '';
    for (var i = 0; i < appFolders.length; i++) {
      if (foldersSequenceString !== '') {
        foldersSequenceString += ',';
      }
      foldersSequenceString += appFolders[i];
    }
    var configTemplate = {
      dist: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: '<%= projectRoot.client %>',
            dest: '<%= projectRoot.dist %>/public',
            src: [
              '*.{ico,png,txt}',
              '.htaccess',
              'bower_components/**/*',
              'assets/images/{,*/}*.{webp}',
              'assets/fonts/**/*'
            ]
          },
          {
            expand: true,
            cwd: '.tmp/images',
            dest: '<%= projectRoot.dist %>/public/assets/images',
            src: ['generated/*']
          },
          {
            expand: true,
            dest: '<%= projectRoot.dist %>',
            src: [
              'package.json',
              'server/**/*'
            ]
          }]
      },
      styles: {
        expand: true,
        cwd: '<%= projectRoot.client %>',
        dest: '.tmp/',
        src: ['{' + foldersSequenceString + ',components}/**/*.css']
      }
    };

    for (var i = 0; i < appFolders.length; i++) {
      var template = {
        expand: true,
        dot: true,
        cwd: '<%= projectRoot.client %>/' + appFolders[i] + ' /',
        dest: '<%= projectRoot.dist %>/public/' + appFolders[i] + '/',
        src: [
          'index.html'
        ]
      };
      configTemplate.dist.files.push(template);
    }

    grunt.config('copy', [configTemplate]);
    if (verboseConfigUpdates) {
      grunt.log.writeln('Config -->' + JSON.stringify(grunt.config('copy')));
    }
  });
};
