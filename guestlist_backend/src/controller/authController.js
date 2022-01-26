import { createUser } from "../lib/databaseUtils";
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

export const loginWithEmailAndPassword = (req, res) => {};
