/**
 * Created by a on 11/9/2015.
 */

'use strict';
module.exports = function (grunt) {
  grunt.registerTask('ngtemplatesConfig', function () {
    var appFolders = grunt.config('projectAppFolders');
    var verboseConfigUpdates = grunt.config('verboseConfigUpdates');

    var configTemplate = {
      options: {
        // This should be the name of your apps angular module
        module: 'buildTestApp',
        htmlmin: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true
        }
      }
    };
    for (var i = 0; i < appFolders.length; i++) {
      var propertyName = appFolders[i] + 'Main';
      var template = {
        cwd: '<%= projectRoot.client %>',
        src: ['{' + appFolders[i] + ',components,shared}/**/*.html'],
        dest: '.tmp/' + appFolders[i] + '/' + appFolders[i] + '-templates.js',
        usemin: appFolders[i] + '/app.js'
      };
      configTemplate.options[propertyName] = template;

      propertyName = appFolders[i] + 'Tmp';
      template = {
        cwd: '.tmp',
        src: ['{' + appFolders[i] + ',components,shared}/**/*.html'],
        dest: '.tmp/' + appFolders[i] + '/tmp-' + appFolders[i] + '-templates.js',
        usemin: appFolders[i] + '/app.js'
      };
      configTemplate.options[propertyName] = template;
    }

    grunt.config('ngtemplates', [configTemplate]);
    if (verboseConfigUpdates) {
      grunt.log.writeln('Config -->' + JSON.stringify(grunt.config('ngtemplates')));
    }

  });
};
