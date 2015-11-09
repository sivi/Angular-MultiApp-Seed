/**
 * Created by a on 11/9/2015.
 */

'use strict';
module.exports = function (grunt) {
  grunt.registerTask('useminPrepareConfig', function () {
    grunt.config('useminPrepare', [{
      //html: ['<%= projectRoot.client %>/mainApp/index.html'],
      mainApp: {
        type: 'html',
        src: ['<%= projectRoot.client %>/mainApp/index.html'],
        dest: '<%= projectRoot.dist %>/public/mainApp'
      },
      adminApp: {
        type: 'html',
        src: ['<%= projectRoot.client %>/adminApp/index.html'],
        dest: '<%= projectRoot.dist %>/public/mainApp'
      },
      editorApp: {
        type: 'html',
        src: ['<%= projectRoot.client %>/editorApp/index.html'],
        dest: '<%= projectRoot.dist %>/public/mainApp'
      },
      options: {
        dest: '<%= projectRoot.dist %>/public',
        root:  '<%= projectRoot %>'
      }
    }]);
  });
};
