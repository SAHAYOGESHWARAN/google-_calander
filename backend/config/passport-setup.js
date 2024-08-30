const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('./keys');
const User = require('../models/User');  // Define a User model similarly to Event

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy({
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: '/auth/google/callback'
  },
  (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id }).then(existingUser => {
      if (existingUser) {
        done(null, existingUser);
      } else {
        new User({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value
        }).save().then(user => done(null, user));
      }
    });
  })
);
