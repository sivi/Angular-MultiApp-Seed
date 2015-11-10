/**
 * Created by a on 11/10/2015.
 */

'use strict';
module.exports = function (grunt) {
  grunt.registerTask('watchConfig', function () {
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
      injectJS: {
        files: [
          '<%= projectRoot.client %>/{' + foldersSequenceString + ',components,shared}/**/*.js',
          '!<%= projectRoot.client %>/{' + foldersSequenceString +
          ',components,shared}/**/*.spec.js',
          '!<%= projectRoot.client %>/{' + foldersSequenceString +
          ',components,shared}/**/*.mock.js'
        ],
        tasks: ['injector:scripts']
      },
      injectCss: {
        files: [
          '<%= projectRoot.client %>/{' + foldersSequenceString + ',components}/**/*.css'
        ],
        tasks: ['injector:css']
      },
      mochaTest: {
        files: ['server/**/*.spec.js'],
        tasks: ['env:test', 'mochaTest']
      },
      jsTest: {
        files: [
          '<%= projectRoot.client %>/{' + foldersSequenceString + ',components}/**/*.spec.js',
          '<%= projectRoot.client %>/{' + foldersSequenceString + ',components}/**/*.mock.js'
        ],
        tasks: ['newer:jshint:all', 'karma']
      },
      injectSass: {
        files: [
          '<%= projectRoot.client %>/{' + foldersSequenceString + ',components}/**/*.{scss,sass}'],
        tasks: ['injector:sass']
      },
      sass: {
        files: [
          '<%= projectRoot.client %>/{' + foldersSequenceString + ',components}/**/*.{scss,sass}'],
        tasks: ['sass', 'autoprefixer']
      },
      jade: {
        files: [
          '<%= projectRoot.client %>/{' + foldersSequenceString + ',components,shared}/*',
          '<%= projectRoot.client %>/{' + foldersSequenceString + ',components,shared}/**/*.jade'],
        tasks: ['jade']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        files: [
          '{.tmp,<%= projectRoot.client %>}/{' + foldersSequenceString + ',components}/**/*.css',
          '{.tmp,<%= projectRoot.client %>}/{' + foldersSequenceString + ',components}/**/*.html',

          '{.tmp,<%= projectRoot.client %>}/{' + foldersSequenceString + ',components}/**/*.js',

          '!{.tmp,<%= projectRoot.client %>}{' + foldersSequenceString +
          ',components}/**/*.spec.js',
          '!{.tmp,<%= projectRoot.client %>}/{' + foldersSequenceString +
          ',components}/**/*.mock.js',
          '<%= projectRoot.client %>/assets/images/{,*//*}*.{png,jpg,jpeg,gif,webp,svg}'
        ],
        options: {
          livereload: true
        }
      },
      express: {
        files: [
          'server/**/*.{js,json}'
        ],
        tasks: ['express:dev', 'wait'],
        options: {
          livereload: true,
          nospawn: true //Without this option specified express won't be reloaded
        }
      }
    };

    grunt.config('watch', configTemplate);
    if (verboseConfigUpdates) {
      grunt.log.writeln('Config -->' + JSON.stringify(grunt.config('watch')));
    }
  });
};
