import UserType from "@/lib/types/user";
import { connectToDb } from "@/lib/utils/db/connectToDb";
import { cookies } from "next/headers";
import { Session } from "../models/session";
import { User } from "../models/user";

export async function sessionInfo() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId")?.value;

  if (!sessionId) {
    return { success: false };
  }

  await connectToDb();

  const session = await Session.findById(sessionId);

  if (!session || session.expiresAt < new Date()) {
    return { success: false };
  }

  const user: UserType | null = await User.findById(session.userId);

  if (!user || !user._id) {
    return { success: false };
  }

  return { success: true, userId: user._id.toString() };
}
