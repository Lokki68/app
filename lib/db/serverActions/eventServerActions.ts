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
  } catch (error) {
    console.error();
    return { success: false, error: (error as Error).message };
  }
}

export async function updateEvent(id: string, formData: FormData) {
  const event = await Event.findById(id);

  if (!event) {
    throw new Error("Event not found");
  }

  const { title, date, description, address, lat, lon } =
    Object.fromEntries(formData);

  const { userId } = await sessionInfo();

  try {
    if (!userId) {
      throw new Error("Utiliseur doit être connecté");
    }

    if (userId !== event.created_by.toString()) {
      throw new Error("L'Utilisateur n'est pas le créateur de l'évènement");
    }

    await connectToDb();

    const updatedEvent = await Event.findByIdAndUpdate(id, {
      title,
      description,
      date,
      address,
      location: {
        type: "Point",
        coordinates: [lon, lat],
      },
    });

    if (!updatedEvent) {
      throw new Error("Evenement introuvable");
    }

    return { success: true, slug: updatedEvent.slug };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

export async function deleteEvent(id: string) {
  try {
    await connectToDb();

    await Event.findByIdAndDelete(id);

    return { success: true };
  } catch (error) {
    console.error("Une errer est survenue : ", error);

    return { success: false };
  }
}
