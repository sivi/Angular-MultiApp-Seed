/**
 * Created by a on 11/10/2015.
 */

'use strict';
module.exports = function (grunt) {
  grunt.registerTask('watchConfig', function () {
    grunt.config('watch', [{
      injectJS: {
        files: [
          '<%= projectRoot.client %>/{adminApp,editorApp,mainApp,components,shared}/**/*.js',
          '!<%= projectRoot.client %>/{adminApp,editorApp,mainApp,components,shared}/**/*.spec.js',
          '!<%= projectRoot.client %>/{adminApp,editorApp,mainApp,components,shared}/**/*.mock.js',
          '!<%= projectRoot.client %>/adminApp/app.js',
          '!<%= projectRoot.client %>/editorApp/app.js',
          '!<%= projectRoot.client %>/mainApp/app.js'],
        tasks: ['injector:scripts']
      },
      injectCss: {
        files: [
          '<%= projectRoot.client %>/{adminApp,editorApp,mainApp,components}/**/*.css'
        ],
        tasks: ['injector:css']
      },
      mochaTest: {
        files: ['server/**/*.spec.js'],
        tasks: ['env:test', 'mochaTest']
      },
      jsTest: {
        files: [
          '<%= projectRoot.client %>/{adminApp,editorApp,mainApp,components}/**/*.spec.js',
          '<%= projectRoot.client %>/{adminApp,editorApp,mainApp,components}/**/*.mock.js'
        ],
        tasks: ['newer:jshint:all', 'karma']
      },
      injectSass: {
        files: [
          '<%= projectRoot.client %>/{adminApp,editorApp,mainApp,components}/**/*.{scss,sass}'],
        tasks: ['injector:sass']
      },
      sass: {
        files: [
          '<%= projectRoot.client %>/{adminApp,editorApp,mainApp,components}/**/*.{scss,sass}'],
        tasks: ['sass', 'autoprefixer']
      },
      jade: {
        files: [
          '<%= projectRoot.client %>/{adminApp,editorApp,mainApp,components,shared}/*',
          '<%= projectRoot.client %>/{adminApp,editorApp,mainApp,components,shared}/**/*.jade'],
        tasks: ['jade']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        files: [
          '{.tmp,<%= projectRoot.client %>}/{adminApp,editorApp,mainApp,components}/**/*.css',
          '{.tmp,<%= projectRoot.client %>}/{adminApp,editorApp,mainApp,components}/**/*.html',

          '{.tmp,<%= projectRoot.client %>}/{adminApp,editorApp,mainApp,components}/**/*.js',

          '!{.tmp,<%= projectRoot.client %>}{adminApp,editorApp,mainApp,components}/**/*.spec.js',
          '!{.tmp,<%= projectRoot.client %>}/{adminApp,editorApp,mainApp,components}/**/*.mock.js',
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
    }]);
  });
};
