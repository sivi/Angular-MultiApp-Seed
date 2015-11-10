/**
 * Created by a on 11/10/2015.
 */

'use strict';
module.exports = function (grunt) {
  grunt.registerTask('sassConfig', function () {
    var appFolders = grunt.config('projectAppFolders');
    var verboseConfigUpdates = grunt.config('verboseConfigUpdates');
    var configTemplate = {
      server: {
        options: {
          loadPath: [
            '<%= projectRoot.client %>/bower_components',
            '<%= projectRoot.client %>/components'
          ],
          compass: false
        },
        files: {
        }
      }
    };
    for (var i = 0; i < appFolders.length; i++) {
      var template = '<%= projectRoot.client %>/' +  appFolders[i];
      configTemplate.server.options.loadPath.push(template);
      var propertyName = '.tmp/' + appFolders[i] + '/app.css';
      template = '<%= projectRoot.client %>/' + appFolders[i] + '/app.scss';
      configTemplate.server.files[propertyName] = template;
    }

    grunt.config('sass', configTemplate);
    if (verboseConfigUpdates) {
      grunt.log.writeln('Config -->' + JSON.stringify(grunt.config('sass')));
    }

  });
};
