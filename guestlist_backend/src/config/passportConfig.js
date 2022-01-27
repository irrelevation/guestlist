import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import path from "path";
import fs from "fs";
import { findUserByID } from "../lib/databaseUtils";
import { logger } from "../logger";

const pathToKey = path.join(process.env.PWD, "id_rsa_pub.pem");
const JWT_PUBLIC_KEY = fs.readFileSync(pathToKey, "utf8");

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_PUBLIC_KEY,
  algorithms: ["RS256"],
  jsonWebTokenOptions: {
    ignoreExpiration: false,
  },
};

export const jwtStrategy = new JWTStrategy(jwtOptions, (payload, done) => {
  findUserByID(payload.sub)
    .then((user) => {
      if (user) return done(null, user);
      return done(null, false);
    })
    .catch((err) => {
      done(err, false);
    });
});

const googleOptions = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/api/v1/auth/redirect/google",
};
const googleStrategy = new GoogleStrategy(googleOptions, function (accessToken, refreshToken, profile, done) {
  logger.debug("hit google strat");
  return done(null, profile);
});

const facebookOptions = {
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/api/v1/auth/redirect/facebook",
  profileFields: ["id", "displayName", "email"],
};
const facebookStrategy = new FacebookStrategy(facebookOptions, function (accessToken, refreshToken, profile, done) {
  logger.debug("hit FB strat");
  return done(null, profile);
});

const override = (obj, done) => done(null, obj);

const passportConfig = (passport) => {
  passport.use(jwtStrategy);
  passport.use(googleStrategy);
  passport.use(facebookStrategy);
  passport.serializeUser(override);
  passport.deserializeUser(override);
};
export default passportConfig;
