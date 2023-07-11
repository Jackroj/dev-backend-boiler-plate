const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {Users} = require('../models');
const bcrypt = require('bcrypt')

passport.use(new LocalStrategy({usernameField: 'email'},function(email, password, done) {
  Users
  .findOne({ where: { email: email } })
  .then(function(user) { // successful query to database
    if(!user) {
      return done(null, false, { message: 'Unknown user ' + email });
    }
    bcrypt.compare(password, user.password, function(err, isMatch) {
      if(err) {
        return done(err);
      }
      if(isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Invalid password' });
      }
    });
  })
  .catch(function(err) { // something went wrong with query to db
    done(err);
  });
}));

// serialize session, only store user id in the session information
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// from the user id, figure out who the user is...
passport.deserializeUser(function(userId, done){
  Users
    .findOne({ where: { id: userId } })
    .then(function(user){
      done(null, user);
    }).catch(function(err){
      done(err, null);
    });
});
