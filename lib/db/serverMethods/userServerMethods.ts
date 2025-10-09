import { connectToDb } from "@/lib/utils/db/connectToDb";
import { User } from "../models/user";

export async function getUsers() {
  await connectToDb();

  const users = await User.find();

  if (!users) {
    throw new Error("No users found!");
  }

  return { success: true, users };
}
