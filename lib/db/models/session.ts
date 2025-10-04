import { createModel } from "@/lib/utils/db/createModel";
import { Schema } from "mongoose";

const sessionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true, index: { expireAfterSeconds: 0 } },
});

export const Session = createModel("Session", sessionSchema);
