// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html
'use strict';

module.exports = function(config) {

  var appFolders = ['adminApp', 'editorApp', 'mainApp'];

  var configTemplate = {
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files:
    [
      'client/bower_components/angular/angular.js',
      'client/bower_components/angular-mocks/angular-mocks.js',
      'client/bower_components/angular-resource/angular-resource.js',
      'client/bower_components/angular-cookies/angular-cookies.js',
      'client/bower_components/angular-sanitize/angular-sanitize.js',
      'client/bower_components/angular-route/angular-route.js',
      'client/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'client/bower_components/lodash/dist/lodash.compat.js'
    ],

    preprocessors:
    {
      '**/*.jade': 'ng-jade2js',
      '**/*.html': 'html2js',
      '**/*.coffee': 'coffee'
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: 'client/'
    },

    ngJade2JsPreprocessor: {
      stripPrefix: 'client/'
    },

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port:  8080,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  };
  //
  //  NOTE:
  //        order of search/import of files is ESSENTIALY important
  //        otherwise tests cannot run. Order must follow those in
  //        index.html files !!!
  //
  var entry;
  for (var i = 0; i < appFolders.length; i++) {
    entry = 'client/' + appFolders[i] + '/app.js';
    configTemplate.files.push(entry);
  }
  entry = 'client/components/componentsModule.js';
  configTemplate.files.push(entry);
  entry = 'client/shared/sharedControllers.js';
  configTemplate.files.push(entry);

  entry = 'client/components/**/*.js';
  configTemplate.files.push(entry);
  entry = 'client/components/**/*.coffee';
  configTemplate.files.push(entry);
  entry = 'client/components/**/*.jade';
  configTemplate.files.push(entry);
  entry = 'client/components/**/*.html';
  configTemplate.files.push(entry);

  entry = 'client/shared/**/*.js';
  configTemplate.files.push(entry);
  entry = 'client/shared/**/*.coffee';
  configTemplate.files.push(entry);
  entry = 'client/shared/**/*.jade';
  configTemplate.files.push(entry);
  entry = 'client/shared/**/*.html';
  configTemplate.files.push(entry);

  for (var i = 0; i < appFolders.length; i++) {
    entry = 'client/' + appFolders[i] + '/app.coffee';
    configTemplate.files.push(entry);
    entry = 'client/' + appFolders[i] + '/**/*.js';
    configTemplate.files.push(entry);
    entry = 'client/' + appFolders[i] + '/**/*.coffee';
    configTemplate.files.push(entry);
    entry = 'client/' + appFolders[i] + '/**/*.jade';
    configTemplate.files.push(entry);
    entry = 'client/' + appFolders[i] + '/**/*.html';
    configTemplate.files.push(entry);
  }

  config.set(configTemplate);
};
