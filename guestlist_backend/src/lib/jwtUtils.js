import jsonwebtoken from "jsonwebtoken";
import path from "path";
import fs from "fs";

const pathToKey = path.join(process.env.PWD, "id_rsa_priv.pem");
const JWT_PRIVATE_KEY = fs.readFileSync(pathToKey, "utf8");

export const issueJWT = (userID) => {
  const expiresIn = "20 s";
  const algorithm = "RS256";
  const payload = {
    sub: userID,
  };

  const jwt = jsonwebtoken.sign(payload, JWT_PRIVATE_KEY, {
    expiresIn,
    algorithm,
  });

  return {
    token: `Bearer ${jwt}`,
    expiresIn,
  };
};
