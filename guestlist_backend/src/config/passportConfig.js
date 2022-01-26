import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import path from "path";
import fs from "fs";
import { findUserByID } from "../lib/databaseUtils";

const pathToKey = path.join(process.env.PWD, "id_rsa_pub.pem");
const JWT_PUBLIC_KEY = fs.readFileSync(pathToKey, "utf8");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_PUBLIC_KEY,
  algorithms: ["RS256"],
};

export const jwtStrategy = new JWTStrategy(options, (payload, done) => {
  findUserByID(payload.sub)
    .then((user) => {
      if (user) return done(null, user);
      return done(null, false);
    })
    .catch((err) => done(err, null));
});
