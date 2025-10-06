import EventType from "@/lib/types/event";
import UserType from "@/lib/types/user";
import { connectToDb } from "@/lib/utils/db/connectToDb";
import { Event } from "../models/event";
import { User } from "../models/user";

export async function getEvents(userId: string) {
  const user: UserType | null = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const events = await Event.find().populate("created_by", user._id);

  if (!events) {
    throw new Error("no events");
  }

  console.log("events =>", events);

  return { success: true, events };
}

export async function getEvent(slug: string): Promise<EventType | null> {
  await connectToDb();

  const event: EventType | null = await Event.findOne({ slug });

  if (!event) return null;

  return event;
}
