import UserType from "@/lib/types/user";
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema<UserType>({
  username: { type: String, required: true, unique: true },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  events: [{ type: Schema.Types.ObjectId, ref: "Event" }],
});

export const User = mongoose.models?.User || mongoose.model("User", userSchema);
