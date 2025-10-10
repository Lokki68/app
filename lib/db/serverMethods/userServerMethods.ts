import UserType from "@/lib/types/user";
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

export async function getContacts(userId: string) {
  try {
    await connectToDb();

    const user = await User.findById(userId).populate("contacts");

    const contacts: UserType[] = user.contacts;

    return { success: true, contacts };
  } catch (error) {
    console.error("Erreur lors de la récupération des contacts : ", error);
    return { success: false };
  }
}
