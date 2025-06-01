import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import { validatePassword } from '../lib/passwordUtils.js';

const customFields = {
  usernameField: 'uname',
  passwordField: 'pw',
};

const verifyCallback = async (username, password, done) => {
  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = rows[0];

    const isValid = validatePassword(password, user.hash, user.salt);

    if (isValid) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    return done(err);
  }
};

// const verifyCallback = (username, password, done) => {
//   User.findOne({ username: username })
//     .then((user) => {
//       if (!user) {
//         return done(null, false);
//       }

//       const isValid = validatePassword(password, user.hash, user.salt);

//       if (isValid) {
//         return done(null, user);
//       } else {
//         return done(null, false);
//       }
//     })
//     .catch((err) => {
//       done(err);
//     });
// };

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
