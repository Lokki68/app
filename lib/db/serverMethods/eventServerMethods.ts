import EventType from "@/lib/types/event";
import { connectToDb } from "@/lib/utils/db/connectToDb";
import { Event } from "../event";

export async function getEvent(slug: string): Promise<EventType | null> {
  await connectToDb();

  const event: EventType | null = await Event.findOne({ slug });

  if (!event) return null;

  return event;
}
