/**
 * Main application routes
 */
(function() {

'use strict';

var errors = require('./components/errors');
var path = require('path');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));

  app.route('/adminApp')
    .get(function(req, res) {
      console.log("route /adminApp  --> /adminApp/index.html");
      res.sendFile(path.resolve(app.get('appPath') + '/adminApp/index.html'));
    });

  app.route('/editorApp')
    .get(function(req, res) {
      console.log("route /editorApp  --> /editorApp/index.html");
      res.sendFile(path.resolve(app.get('appPath') + '/editorApp/index.html'));
    });

  app.route('/mainApp')
    .get(function(req, res) {
      console.log("route /mainApp  --> /mainApp/index.html");
      res.sendFile(path.resolve(app.get('appPath') + '/mainApp/index.html'));
    });

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      console.log("route /*  --> /mainApp/index.html");
      res.sendFile(path.resolve(app.get('appPath') + '/mainApp/index.html'));
    });
};
})();
