"use server";

import { connectToDb } from "@/lib/utils/db/connectToDb";
import { Event } from "../models/event";

export async function addEvent(formData: FormData) {
  const { title, date, description, address, lat, lon } = Object.fromEntries(
    formData.entries()
  );

  try {
    await connectToDb();

    const newEvent = new Event({
      title,
      date,
      description,
      location: {
        type: "Point",
        coordinates: [lon, lat],
      },
      address,
    });

    const result = await newEvent.save();

    return { success: true, slug: result.slug };
  } catch (error: Error | unknown) {
    console.error(
      "Error adding event:",
      error instanceof Error ? error.message : error
    );
    throw new Error("Failed to add event");
  }
}
