var User = require('../models/user.model.js');
var passport = require('passport');
var mongoose = require('mongoose');

var userController = {};

// Restict access to root page
// userController.home = function(req, res) {
//   res.render('index', { user: req.user });
// };

// Go to registration page
// userController.register = function(req, res) {
//   res.render('register');
// };

//Post registration
// userController.doRegister = function(req, res) {
//   User.register(new User({ username : req.body.username, name: req.body.name }), req.body.password, function(err, user) {
//     if (err) {
//       console.log(err);
//     }
//
//     passport.authenticate('local')(req, res, function () {
//       console.log('success');
//     });
//   });
// };
//
//
// userController.doLogin = function(req, res) {
//   passport.authenticate('local')(req, res, function() {
//     console.log('login successful');
//   });
// };

// userController.logout = function(req, res) {
//   req.logout();
// };

module.exports = userController;
