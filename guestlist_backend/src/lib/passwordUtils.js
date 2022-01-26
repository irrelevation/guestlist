import argon2 from "argon2";

// Hashing algorithm chosen according to OWASP suggestions, see https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
export const hash = async (password) => {
  return argon2.hash(password, {
    type: argon2.argon2id,
    // in KB, should be at least 16 MB (i.e. 2^14 KB)
    memoryCost: 2 ** 15,
    // # of iterations, should be at least 2
    timeCost: 3,
  });
};

export const verify = async (hash, password) => {
  return argon2.verify(hash, password);
};
