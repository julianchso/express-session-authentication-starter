import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { models } from './database';
import { validPassword } from '../lib/passwordUtils';
const User = models.User;

const customFields = {
  usernameField: 'uname',
  passwordField: 'pw',
};

const verifyCallback = (username, password, done) => {
  User.findOne({ username: username })
    .then((user) => {
      if (!user) {
        return done(null, false);
      }

      const isValid = validPassword(password, user.hash, user.salt);

      if (isValid) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch((err) => {
      done(err);
    });
};

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

// passport.use(
//   new LocalStrategy(function (username, password, cb) {
//     User.findOne({ username: username })
//       .then((user) => {
//         if (!user) {
//           return cb(null, false);
//         }

//         const isValid = validPassword(password, user.hash, user.salt);

//         if (isValid) {
//           return cb(null, user);
//         } else {
//           return cb(null, false);
//         }
//       })
//       .catch((err) => {
//         cb(err);
//       });
//   })
// );
