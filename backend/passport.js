const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/User");

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "s3cr3t";

module.exports = passport =>
  passport.use(
    new JwtStrategy(opts, (payload, done) => {
      User.findOne({ id: payload.id }, (err, user) => {
        if (err) return done(err, false);
        if (user) return done(null, user);
      });
    })
  );
