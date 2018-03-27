var users = require('../controllers/user.controller.js');
var AuthenticationController = require('../controllers/authentication');
var passportService = require('../config/passport');
var passport = require('passport');

var requireAuth = passport.authenticate('jwt', {session: false});
var requireLogin = passport.authenticate('local', {session: false});

module.exports = function(app) {


  // Create a new user
  app.post('/api/users/register', AuthenticationController.register);

  // Login
  app.post('/api/users/login', AuthenticationController.login);

  // Logout
  // app.post('/api/users/logout', users.logout);

}
