import { User } from "../models/user";
import { sessionInfo } from "../serverMethods/sessionServerMethods";
import { connectToDb } from "@/lib/utils/db/connectToDb";

export async function addContact(contactId: string) {
  await connectToDb()

  const { userId } = await sessionInfo()

  if (contactId === userId) {
    throw new Error('Ne peux pas se rajouter soit même aux contacts')
  }

  const contact = await User.findById(contactId)
  if (!contact) {
    throw new Error("Ce contact n'existe pas")
  }

  const updatedUserDoc = User.findByIdAndUpdate(
    userId,
    { $addToSet: { contacts: contactId } },
    { new: true }
  ).populate('contacts', 'username email')

  const updatedUser = updatedUserDoc?.toObject()

  if (!updatedUser) {
    throw new Error('Une erreur est survenue')
  }


  return { success: true, user: updatedUser }
}


export async function removeContact(contactId) {
  await connectToDb()

  const { userId } = await sessionInfo()

  const contact = await User.findById(contactId)
  if (!contact) {
    throw new Error("Ce contact n'existe pas")
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $pull: { contacts: contactId } },
    { new: true }
  )

  if (!updatedUser) {
    throw new Error('Une erreur est survenue')
  }

  return { success: true, user: updatedUser }
}
