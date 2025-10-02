import { Schema } from "mongoose";

type UserType = {
  _id?: string;
  username: string;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  events?: {
    type: Schema.Types.ObjectId;
    ref: "Event";
  }[]; // Array of Event IDs
};

export default UserType;
