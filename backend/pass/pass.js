import passport from 'passport';
import {LocalStrategy} from 'passport-local';
import User from '../model/User.js';
import { createHmac} from "crypto";

passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        const givenPassword =createHmac('sha256',user.salt).update(password).digest('hex');
        if (user.password!==givenPassword) { return done(null, false); }
        return done(null, user);
      });
    }
  ));

// Serialize user instance to the session
passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  // Deserialize user instance from the session
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });