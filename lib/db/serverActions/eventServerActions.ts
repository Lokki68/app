"use server";

import { connectToDb } from "@/lib/utils/db/connectToDb";
import AppError from "../errorHandling/customError";
import { Event } from "../models/event";
import { sessionInfo } from "../serverMethods/sessionServerMethods";

export async function addEvent(formData: FormData) {
  const { title, date, description, address, lat, lon } = Object.fromEntries(
    formData.entries()
  );

  const { userId } = await sessionInfo();

  try {
    if (
      typeof title !== "string" ||
      typeof date !== "string" ||
      typeof description !== "string" ||
      typeof address !== "string" ||
      typeof lat !== "string" ||
      typeof lon !== "string"
    ) {
      throw new AppError("Format non conforme");
    }

    if (!userId) {
      throw new AppError("L'utilisateur doit être connecté");
    }
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
      created_by: userId,
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
