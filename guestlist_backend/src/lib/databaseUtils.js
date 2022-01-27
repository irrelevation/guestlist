import { User } from "../models/userModel";

export const findUserByID = async (id) => {
  return User.findById(id);
};
export const findUserByEmail = async (email) => {
  return User.findOne({ email });
};

export const createUser = async (user) => {
  return User.create(user);
};

export const findOrCreateUser = async (userInfo) => {
  let user = await findUserByEmail(userInfo.email);
  user ??= await createUser(userInfo);
  return user;
};
