/**
 * Created by a on 11/9/2015.
 */

'use strict';
module.exports = function (grunt) {

  grunt.registerTask('useminPrepareConfig', function () {
    var appFolders = grunt.config('projectAppFolders');
    var verboseConfigUpdates = grunt.config('verboseConfigUpdates');

    var configTemplate = {
      //html: ['<%= projectRoot.client %>/mainApp/index.html'],
      options: {
        dest: '<%= projectRoot.dist %>/public',
        root:  '<%= projectRoot %>'
      }
    };
    for (var i = 0; i < appFolders.length; i++) {
      var propertyName = appFolders[i];
      var template = {
        type: 'html',
        src: ['<%= projectRoot.client %>/' + appFolders[i] + '/index.html'],
        dest: '<%= projectRoot.dist %>/public/' + appFolders[i]
      };
      configTemplate[propertyName] = template;
    }
    grunt.log.writeln('before set -->' + JSON.stringify(grunt.config('useminPrepare')));

    grunt.config('useminPrepare', configTemplate);
    if (verboseConfigUpdates) {
      grunt.log.writeln('Config -->' + JSON.stringify(grunt.config('useminPrepare')));
    }
  });
  //
  //    --------------  fix useminPrepare result
  //
  grunt.registerTask('useminFixGeneratedConcatConfig', function () {

    var path = require('path');

    var verboseConfigUpdates = grunt.config('verboseConfigUpdates');
    var configTemplate = grunt.config('concat.generated.files');

    var bowerPath0 = 'bower_components';
    var bowerPath1 = path.sep + 'bower_components';
    for (var i = 0; i < configTemplate.length; i++) {
      var entityPairSrc = configTemplate[i].src;
      for (var j = 0; j < entityPairSrc.length; j++) {
        var descriptor = entityPairSrc[j];
        var bowerLocation1 = descriptor.indexOf(bowerPath1);

        if (bowerLocation1 > 0 &&
            descriptor.charAt(0) === '{' &&
            descriptor.charAt(bowerLocation1 - 1) !== '}') {
          descriptor = descriptor.substring(0, bowerLocation1) + '}' +
            descriptor.substring(bowerLocation1);
          entityPairSrc[j] = descriptor;
        }
        else
        if (descriptor.indexOf(bowerPath0) === 0) {
          descriptor = '{client,.tmp}' + path.sep + descriptor;
          entityPairSrc[j] = descriptor;
        }

      }
    }
    grunt.config('concat.generated.files', configTemplate);
    if (verboseConfigUpdates) {
      grunt.log.writeln('Config -->' + JSON.stringify(grunt.config('concat')));
    }

  });

};
