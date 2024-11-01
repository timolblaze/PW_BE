import bcrypt from "bcrypt";
import { ROUNDS as rounds } from "@configs";

export const hash = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(rounds);
  return await bcrypt.hash(password, salt);
};

export const verifyHash = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};