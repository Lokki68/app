import EventType from "@/lib/types/event";
import { connectToDb } from "@/lib/utils/db/connectToDb";
import { Schema } from "mongoose";
import { Event } from "../models/event";

export async function getEvents(userId: Schema.Types.ObjectId) {
  const events = await Event.find().populate("created_by", userId);

  if (!events) {
    throw new Error("no events");
  }

  return { success: true, events };
}

export async function getEvent(slug: string): Promise<EventType | null> {
  await connectToDb();

  const event: EventType | null = await Event.findOne({ slug });

  if (!event) return null;

  return event;
}
