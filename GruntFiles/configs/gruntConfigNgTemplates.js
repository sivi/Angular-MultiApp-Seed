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
        // NOTE: index.html MUST be excluded, otherwise usemin anihilates content of app.js !!!
        src: ['{' + appFolders[i] + ',components,shared}/**/*.html!index.html'],
        dest: '.tmp/' + appFolders[i] + '/' + appFolders[i] + '-templates.js',
        usemin: appFolders[i] + '/app.js'
      };
      configTemplate[propertyName] = template;

      propertyName = appFolders[i] + 'Tmp';
      template = {
        cwd: '.tmp',
        src: ['{' + appFolders[i] + ',components,shared}/**/*.html'],
        dest: '.tmp/' + appFolders[i] + '/tmp-' + appFolders[i] + '-templates.js',
        usemin: appFolders[i] + '/app.js'
      };
      configTemplate[propertyName] = template;
    }

    grunt.config('ngtemplates', configTemplate);
    if (verboseConfigUpdates) {
      grunt.log.writeln('Config -->' + JSON.stringify(grunt.config('ngtemplates')));
    }

  });

  //
  //    --------------  fix useminPrepare result
  //
  grunt.registerTask('templatesFixGeneratedConcatConfig', function () {

    var path = require('path');

    var verboseConfigUpdates = grunt.config('verboseConfigUpdates');
    var configTemplate = grunt.config('concat.generated.files');
    for (var i = 0; i < configTemplate.length; i++) {
      var entityPairSrc = configTemplate[i].src;
      var entityPairDest = configTemplate[i].dest;
      var entryArray = entityPairDest.split(path.sep);
      if (entryArray[entryArray.length - 1] === 'app.js') {
        var folderEntry = entryArray[entryArray.length - 2];
        var srcEntry = '.tmp/' + folderEntry + '/tmp-' + folderEntry + '-templates.js';
        entityPairSrc.push(srcEntry);
        srcEntry = '.tmp/' + folderEntry + '/' + folderEntry + '-templates.js';
        entityPairSrc.push(srcEntry);
      }
    }
    grunt.config('concat.generated.files', configTemplate);
    if (verboseConfigUpdates) {
      grunt.log.writeln('Config -->' + JSON.stringify(grunt.config('concat')));
    }

  });

};
