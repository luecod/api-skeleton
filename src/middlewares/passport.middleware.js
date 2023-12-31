const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const { findUserById } = require('../users/users.controllers')

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'Alt4irTesis'
}

passport.use(new JwtStrategy(options, (tokenDecoded, done) => {
  // done(error, user)

  //done(null, false)
  //done(error, false)
  //done(null, user) <- este en satisfactorio

  findUserById(tokenDecoded.id)
    .then(user => {
      if (user) {
        done(null, user)
      } else {
        done(null, false)
      }
    })
    .catch(err => {
      done(err, false)
    })
}))

module.exports = passport