import { verify } from "argon2";
import { createUser, findOrCreateUser, findUserByEmail } from "../lib/databaseUtils";
import { issueJWT } from "../lib/jwtUtils";
import { hash } from "../lib/passwordUtils";
import { logger } from "../logger";

export const signUp = async (req, res) => {
  const { email, username, password } = req.body;
  const hashedPassword = await hash(password);

  const { _id } = await createUser({ email, username, hashedPassword });
  const { token, expiresIn } = issueJWT(_id);

  res.json({
    message: "User created successfully",
    user: { email, username, _id },
    token,
    expiresIn,
  });
};

export const loginWithEmailAndPassword = async (req, res, next) => {
  const user = await findUserByEmail(req.body.email);
  if (!user) {
    logger.warn(`Login failed: ${req.body.email} is not registered`);
    return next({ message: "User not found", status: 401 });
  }

  const { email, username, hashedPassword, _id } = user;
  const isValid = await verify(hashedPassword, req.body.password);
  if (!isValid) {
    logger.warn(`Login failed: Invalid password for [${email}]`);
    return next({ message: "invalid password", status: 401 });
  }

  const { token, expiresIn } = issueJWT(_id);

  res.json({
    status: 200,
    message: "Login successful",
    user: { email, username, _id },
    token,
    expiresIn,
  });
};

export const loginWithGoogle = async (req, res) => {
  logger.debug("[OAuth2.0] Google redirect");
  let userInfo = {
    username: req.user.displayName,
    email: req.user._json.email,
    provider: req.user.provider,
  };
  const { email, username, _id } = await findOrCreateUser(userInfo);
  const { token, expiresIn } = issueJWT(_id);

  res.json({
    status: 200,
    message: "Login successful",
    user: { email, username, _id },
    token,
    expiresIn,
  });
};

export const loginWithFacebook = async (req, res) => {
  logger.debug("[OAuth2.0] Facebook redirect");
  let userInfo = {
    username: req.user.displayName,
    email: req.user._json.email,
    provider: req.user.provider,
  };
  const { email, username, _id } = await findOrCreateUser(userInfo);
  const { token, expiresIn } = issueJWT(_id);

  res.json({
    status: 200,
    message: "Login successful",
    user: { email, username, _id },
    token,
    expiresIn,
  });
};
