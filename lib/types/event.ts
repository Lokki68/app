import mongoose from "mongoose";

type EventType = {
  _id?: string;
  title: string;
  description: string;
  date: Date;
  location: {
    type: "Point";
    coordinates: [number, number]; // [longitude, latitude]
  };
  created_by: mongoose.Schema.Types.ObjectId; // User ID
  active: boolean;
};

export default EventType;
