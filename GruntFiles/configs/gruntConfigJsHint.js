/**
 * Created by a on 11/9/2015.
 */
'use strict';
module.exports = function (grunt) {

  grunt.registerTask('jshintConfig', function () {

    var appFolders = grunt.config('projectAppFolders');
    var verboseConfigUpdates = grunt.config('verboseConfigUpdates');

    var foldersSequenceString = '';
    for (var i = 0; i < appFolders.length; i++) {
      if (foldersSequenceString !== '') {
        foldersSequenceString += ',';
      }
      foldersSequenceString += appFolders[i];
    }

    var jsHintConfig = {
      options: {
        jshintrc: '<%= projectRoot.client %>/.jshintrc',
        reporter: require('jshint-stylish')
      },
      server: {
        options: {
          jshintrc: 'server/.jshintrc'
        },
        src: [
          'server/**/*.js',
          '!server/**/*.spec.js'
        ]
      },
      serverTest: {
        options: {
          jshintrc: 'server/.jshintrc-spec'
        },
        src: ['server/**/*.spec.js']
      },
      all: [
        '<%= projectRoot.client %>/{' + foldersSequenceString + ',components}/**/*.js',
        '!<%= projectRoot.client %>/{' + foldersSequenceString + ',components}/**/*.spec.js',
        '!<%= projectRoot.client %>/{' + foldersSequenceString + ',components}/**/*.mock.js'
      ],
      test: {
        src: [
          '<%= projectRoot.client %>/{' + foldersSequenceString + ',components}/**/*.spec.js',
          '<%= projectRoot.client %>/{' + foldersSequenceString + ',components}/**/*.mock.js'
        ]
      }
    };
    // Make sure code styles are up to par and there are no obvious mistakes
    grunt.config('jshint', [jsHintConfig]);
    if (verboseConfigUpdates) {
      grunt.log.writeln('Config -->' + JSON.stringify(grunt.config('jshint')));
    }
  });
};

