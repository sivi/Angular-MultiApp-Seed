/**
 * Created by a on 11/9/2015.
 */

'use strict';
module.exports = function (grunt) {
  grunt.registerTask('injectorConfig', function () {
    var appFolders = grunt.config('projectAppFolders');
    var verboseConfigUpdates = grunt.config('verboseConfigUpdates');

    var configTemplate = {
      options: {},
      // Inject application script files into index.html (doesn't include bower)
      scripts: {
        options: {
          transform: function (filePath) {
            filePath = filePath.replace('/client/', '');
            filePath = filePath.replace('/.tmp/', '');
            return '<script src="' + filePath + '"></script>';
          },
          starttag: '<!-- injector:js -->',
          endtag: '<!-- endinjector -->'
        },
        files: {
        }
      },

      // Inject component scss into app.scss
      sass: {
        options: {
          transform: function (filePath) {
            for (var i = 0; i < appFolders.length; i++) {
              filePath = filePath.replace('/client/' + appFolders[i] + '/', '');
            }
            filePath = filePath.replace('/client/components/', '');
            return '@import \'' + filePath + '\';';
          },
          starttag: '// injector',
          endtag: '// endinjector'
        },
        files: {
        }
      },

      // Inject component css into index.html
      css: {
        options: {
          transform: function (filePath) {
            filePath = filePath.replace('/client/', '');
            filePath = filePath.replace('/.tmp/', '');
            return '<link rel="stylesheet" href="' + filePath + '">';
          },
          starttag: '<!-- injector:css -->',
          endtag: '<!-- endinjector -->'
        },
        files: {
        }
      }
    };

    for (var i = 0; i < appFolders.length; i++) {
      configTemplate.scripts.files['<%= projectRoot.client %>/' + appFolders[i] + '/index.html'] =
        [
          '{.tmp,<%= projectRoot.client %>}/{' + appFolders[i] + ',components}/**/*.js',
          '!{.tmp,<%= projectRoot.client %>}/components/componentsModule.js',
          '!{.tmp,<%= projectRoot.client %>}/' + appFolders[i] + '/app.js',
          '!{.tmp,<%= projectRoot.client %>}/{' + appFolders[i] + ',components}/**/*.spec.js',
          '!{.tmp,<%= projectRoot.client %>}/{' + appFolders[i] + ',components}/**/*.mock.js'
        ];
      configTemplate.sass.files['<%= projectRoot.client %>/' + appFolders[i] + '/app.scss'] =
        [
          '<%= projectRoot.client %>/{' + appFolders[i] + ',components}/**/*.{scss,sass}',
          '!<%= projectRoot.client %>/' + appFolders[i] + '/app.{scss,sass}'
        ];
      configTemplate.css.files['<%= projectRoot.client %>/' + appFolders[i] + '/index.html'] =
        [
          '<%= projectRoot.client %>/{' + appFolders[i] + ',components}/**/*.css'
        ];
    }


    // Make sure code styles are up to par and there are no obvious mistakes
    grunt.config('injector', configTemplate);
    if (verboseConfigUpdates) {
      grunt.log.writeln('Config -->' + JSON.stringify(grunt.config('injector')));
    }
  });
};

