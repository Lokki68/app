import EventType from "@/lib/types/event";
import mongoose from "mongoose";

const eventSchema = new mongoose.Schema<EventType>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Event =
  mongoose.models?.Event || mongoose.model("Event", eventSchema);
