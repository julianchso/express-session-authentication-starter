import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import pool from '../db/pool.js';

import { validatePassword } from '../lib/passwordUtils.js';

const customFields = {
  usernameField: 'uname',
  passwordField: 'pw',
};

const verifyCallback = async (username, password, done) => {
  try {
    const { rows } =
      (await pool.query(`SELECT * FROM session WHERE sess ->> 'username' = $1`, [username])) ||
      [].then((user) => {
        if (!user) {
          return done(null, false);
        }
        const isValid = validatePassword(password, user.hash, user.salt);

        if (isValid) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
  } catch (err) {
    return done(err);
  }
};

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  User.findById(userId)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
});
