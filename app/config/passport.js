var passport = require('passport');
var User = require('../models/user.model');
var config = require('./db.config');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var LocalStrategy = require('passport-local');

var localOptions = { usernameField: 'email' };

var localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  User.findOne({email: email}, function(err, user) {
    if (err) { return done(err); }
    if (!user) { return done(null, false, { error: 'Your login details could not be verified.'}); }

    user.comparePassword(password, function(err, isMatch) {
      if (err) { return done(err); }
      if (!isMatch) { return done(null, false, { error: "Could not be verified." }); }

      return done(null, user);
    });
  });
});

var jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
  secretOrKey: config.secret
};

var jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  User.findById(payload._id, function(err, user) {
    if (err) { return done(err, false); }
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

passport.use(jwtLogin);
passport.use(localLogin);
