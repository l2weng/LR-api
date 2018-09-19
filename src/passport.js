/**
 * Passport.js reference implementation.
 * The database schema used in this sample is available at
 * https://github.com/membership/membership.db/tree/master/postgres
 */

import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import md5 from 'blueimp-md5';
import {WindUser} from "./data/wind/models";
import Company from "./data/wind/models/Company";

/**
 * Sign in with Local.
 */
passport.use('wind',
  new LocalStrategy((name, password, done) => {
    WindUser.findOne({
      where: { name },
      include: { model: Company, as: 'company' },
    }).then(user => {
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      if (md5(password) !== user.password_hash) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }),
);

export default passport;
