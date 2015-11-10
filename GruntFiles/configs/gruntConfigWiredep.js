/**
 * Created by a on 11/10/2015.
 */

'use strict';
module.exports = function (grunt) {
  grunt.registerTask('wiredepConfig', function () {
    var appFolders = grunt.config('projectAppFolders');
    var verboseConfigUpdates = grunt.config('verboseConfigUpdates');
    var configTemplate = {
      target: {
        src: [],
        ignorePath: '<%= projectRoot.client %>/',
        exclude: [/bootstrap-sass-official/, /bootstrap.js/,
          '/json3/', '/es5-shim/', /bootstrap.css/, /font-awesome.css/]
      }
    };
    for (var i = 0; i < appFolders.length; i++) {
      var entry = '<%= projectRoot.client %>/' + appFolders[i] + '/index.html';
      configTemplate.target.src.push(entry);
    }

    grunt.config('wiredep', configTemplate);
    if (verboseConfigUpdates) {
      grunt.log.writeln('Config -->' + JSON.stringify(grunt.config('wiredep')));
    }
  });
};
