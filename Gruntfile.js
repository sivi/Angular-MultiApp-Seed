// Generated on 2015-11-06 using generator-angular-fullstack 2.1.1
'use strict';

module.exports = function (grunt) {

  var appFolders = ['adminApp', 'editorApp', 'mainApp'];
  // turn on if dump of updates is requiered
  var verboseConfigUpdates = true;

  grunt.task.loadTasks('./GruntFiles/configs');
  grunt.task.loadTasks('./GruntFiles/tasks');

  var localConfig;
  try {
    localConfig = require('./server/config/local.env');
  } catch (e) {
    localConfig = {};
  }

  // Load grunt tasks automatically, when needed
  require('jit-grunt')(grunt, {
    express: 'grunt-express-server',
    useminPrepare: 'grunt-usemin',
    ngtemplates: 'grunt-angular-templates',
    cdnify: 'grunt-google-cdn',
    protractor: 'grunt-protractor-runner',
    buildcontrol: 'grunt-build-control'
  });

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    pkg: grunt.file.readJSON('package.json'),
    projectRoot: {
      // configurable paths
      client: require('./bower.json').appPath || 'client',
      dist: 'dist'
    },
    projectAppFolders: appFolders,
    verboseConfigUpdates:verboseConfigUpdates,
    express: {
      options: {
        port: process.env.PORT || 9000
      },
      dev: {
        options: {
          script: 'server/app.js',
          debug: true
        }
      },
      prod: {
        options: {
          script: 'dist/server/app.js'
        }
      }
    },
    open: {
      server: {
        url: 'http://localhost:<%= express.options.port %>'
      }
    },
    watch: {
      // see GruntFiles/configs/gruntConfigWatch.js
    },
    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      // see GruntFiles/configs/gruntConfigJsHint.js
    },
    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= projectRoot.dist %>/*',
            '!<%= projectRoot.dist %>/.git*',
            '!<%= projectRoot.dist %>/.openshift',
            '!<%= projectRoot.dist %>/Procfile'
          ]
        }]
      },
      server: '.tmp'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/',
          src: '{,*/}*.css',
          dest: '.tmp/'
        }]
      }
    },

    // Debugging with node inspector
    'node-inspector': {
      custom: {
        options: {
          'web-host': 'localhost'
        }
      }
    },

    // Use nodemon to run server in debug mode with an initial breakpoint
    nodemon: {
      debug: {
        script: 'server/app.js',
        options: {
          nodeArgs: ['--debug-brk'],
          env: {
            PORT: process.env.PORT || 9000
          },
          callback: function (nodemon) {
            nodemon.on('log', function (event) {
              console.log(event.colour);
            });

            // opens browser on initial server start
            nodemon.on('config:update', function () {
              setTimeout(function () {
                require('open')('http://localhost:8080/debug?port=5858');
              }, 500);
            });
          }
        }
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      // see GruntFiles/configs/gruntConfigWiredep.js
    },

    // Renames files for browser caching purposes
    filerev: {
      options: {
        algorithm: 'md5',
        length: 8
      },
      dist: {
        src: [
          '<%= projectRoot.dist %>/public/{,*/}*.js',
          '<%= projectRoot.dist %>/public/{,*/}*.css',
          '<%= projectRoot.dist %>/public/assets/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= projectRoot.dist %>/public/assets/fonts/*'
      ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      // see GruntFiles/configs/gruntConfigUseminPrepare.js
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      html: ['<%= projectRoot.dist %>/public/{,*/}*.html'],
      css: ['<%= projectRoot.dist %>/public/{,*/}*.css'],
      js: ['<%= projectRoot.dist %>/public/{,*/}*.js'],
      options: {
        assetsDirs: [
          '<%= projectRoot.dist %>/public',
          '<%= projectRoot.dist %>/public/assets/images'
        ],
        // This is so we update image references in our ng-templates
        patterns: {
          js: [
            [/(assets\/images\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm, 'Update the JS to reference our revved images']
          ]
        }
      }
    },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= projectRoot.client %>/assets/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= projectRoot.dist %>/public/assets/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= projectRoot.client %>/assets/images',
          src: '{,*/}*.svg',
          dest: '<%= projectRoot.dist %>/public/assets/images'
        }]
      }
    },

    // Allow the use of non-minsafe AngularJS files. Automatically makes it
    // minsafe compatible so Uglify does not destroy the ng references
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat',
          src: '**/*.js',
          dest: '.tmp/concat'
        }]
      }
    },

    // Package all the html partials into a single javascript payload
    ngtemplates: {
      // see GruntFiles/configs/gruntConfigNgTemplates.js
    },
    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= projectRoot.dist %>/public/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      // see GruntFiles/configs/gruntConfigCopy.js
    },

    buildcontrol: {
      options: {
        dir: 'dist',
        commit: true,
        push: true,
        connectCommits: false,
        message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
      },
      heroku: {
        options: {
          remote: 'heroku',
          branch: 'master'
        }
      },
      openshift: {
        options: {
          remote: 'openshift',
          branch: 'master'
        }
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'jade',
        'sass'
      ],
      test: [
        'jade',
        'sass'
      ],
      debug: {
        tasks: [
          'nodemon',
          'node-inspector'
        ],
        options: {
          logConcurrentOutput: true
        }
      },
      dist: [
        'jade',
        'sass',
        //'imagemin',
        'svgmin'
      ]
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },

    mochaTest: {
      options: {
        reporter: 'spec'
      },
      src: ['server/**/*.spec.js']
    },

    protractor: {
      options: {
        configFile: 'protractor.conf.js'
      },
      chrome: {
        options: {
          args: {
            browser: 'chrome'
          }
        }
      }
    },

    env: {
      test: {
        NODE_ENV: 'test'
      },
      prod: {
        NODE_ENV: 'production'
      },
      all: localConfig
    },

    // Compiles Jade to html
    jade: {
      // see GruntFiles/configs/gruntConfigJade.js
    },

    // Compiles Sass to CSS
    sass: {
      // see GruntFiles/configs/gruntConfigSass.js
    },

    injector: {
      // see GruntFiles/configs/gruntConfigInjector.js
    },
    concat: {
    }
  });
  var updateConfig = function(grunt) {
    grunt.task.run(['copyConfig', 'injectorConfig', 'jadeConfig', 'jshintConfig',
      'ngtemplatesConfig', 'sassConfig', 'useminPrepareConfig', 'watchConfig', 'wiredepConfig'
    ]);
  };
  updateConfig(grunt);

  grunt.registerTask('testConfig', function () {
    grunt.task.run(['useminPrepare', 'useminFixGeneratedConcatConfig', 'templatesFixGeneratedConcatConfig', 'concat']);
    // grunt.task.run(['useminPrepareConfig', 'useminPrepare', 'useminFixGeneratedConcatConfig', 'templatesFixGeneratedConcatConfig']);

  });

  // for tasks see
  //   GruntFiles/tasks/gruntServeTask.js   : 'serve'
  //   GruntFiles/tasks/gruntTestTask.js    : 'test'
  //   GruntFiles/tasks/gruntLibraryTask.js : 'build', 'default', 'express-keepalive', 'wait'
  //
};
