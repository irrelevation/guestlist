import passport from "passport";

export const jwtAuth = passport.authenticate("jwt", { session: false });
export const googleAuth = passport.authenticate("google", { scope: ["profile", "email"] });
export const facebookAuth = passport.authenticate("facebook", { scope: "email" });
