/**
 * Passport.js reference implementation.
 * The database schema used in this sample is available at
 * https://github.com/membership/membership.db/tree/master/postgres
 */

import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import md5 from 'blueimp-md5';
import { User } from './data/models';

/**
 * Sign in with Local.
 */
passport.use(
  'lr',
  new LocalStrategy((name, password, done) => {
    User.findOne({
      where: { name },
    }).then(user => {
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      if (md5(password) !== user.password_hash) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      delete user.dataValues.password_hash
      return done(null, user)
    });
  }),
);

export default passport;
