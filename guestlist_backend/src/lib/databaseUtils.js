import { User } from "../models/userModel";

export const findUserByID = async (id) => {
  return User.findUserByID(id);
};

export const createUser = async ({ email, username, hashedPassword }) => {
  return User.create({ email, username, hashedPassword });
};
