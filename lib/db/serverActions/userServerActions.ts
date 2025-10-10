import { connectToDb } from "@/lib/utils/db/connectToDb";
import { User } from "../models/user";
import { sessionInfo } from "../serverMethods/sessionServerMethods";

export async function addContact(contactId: string) {
  await connectToDb();

  const { userId } = await sessionInfo();

  if (contactId === userId) {
    throw new Error("Ne peux pas se rajouter soit même aux contacts");
  }

  const contact = await User.findById(contactId);
  if (!contact) {
    throw new Error("Ce contact n'existe pas");
  }

  await User.findByIdAndUpdate(
    userId,
    { $addToSet: { contacts: contactId } },
    { new: true }
  )
    .populate("contacts", "username email")
    .lean();

  const updatedUser = await User.findById(userId);

  if (!updatedUser) {
    throw new Error("Une erreur est survenue");
  }

  return { success: true, user: updatedUser.toObject() };
}

export async function removeContact(contactId) {
  await connectToDb();

  const { userId } = await sessionInfo();

  const contact = await User.findById(contactId);
  if (!contact) {
    throw new Error("Ce contact n'existe pas");
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $pull: { contacts: contactId } },
    { new: true }
  );

  if (!updatedUser) {
    throw new Error("Une erreur est survenue");
  }

  return { success: true, user: updatedUser };
}
