'use strict';

var passport = require('passport'),
GoogleStrategy = require('passport-google-oauth20').Strategy;
var keys = require('../local.js');

var verifyHandler = function (req, token, tokenSecret, profile, done) {

  var data = {
    id: profile.id,
    name: profile.displayName,
    email: profile.emails[0].value,
    token,
  };

  return done(null, data);
};

passport.use(new GoogleStrategy({
  clientID: keys.google.clientID,
  clientSecret: keys.google.clientSecret,
  callbackURL: '/api/v1/auth/google/callback',
  passReqToCallback: true
}, verifyHandler));
