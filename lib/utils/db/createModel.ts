import mongoose from "mongoose";

export function createModel(name: string, schema: mongoose.Schema) {
  const isDev = process.env.NODE_ENV !== "production";

  if (isDev && mongoose.models[name]) {
    delete mongoose.models[name];
  }

  return mongoose.models[name] || mongoose.model(name, schema);
}
