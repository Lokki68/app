import { Schema } from "mongoose";

type UserType = {
  _id?: string;
  username: string;
  normalizedUsername: string;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  events?: {
    type: Schema.Types.ObjectId;
    ref: "Event";
  }[];
  contacts?: {
    type: Schema.Types.ObjectId;
    ref: "User";
  }[];
};

export default UserType;
