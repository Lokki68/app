import { Schema } from "mongoose";

type EventType = {
  _id?: string;
  title: string;
  slug?: string;
  description: string;
  date: Date;
  location: {
    type: "Point";
    coordinates: [number, number]; // [longitude, latitude]
  };
  address: string;
  created_by: Schema.Types.ObjectId; // User ID
  active: boolean;
};

export default EventType;
