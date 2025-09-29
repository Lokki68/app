import mongoose from "mongoose";

export async function connectToDb() {
  if (mongoose.connection.readyState) {
    console.log("Using existing connection :", mongoose.connection.name);
  }

  try {
    await mongoose.connect(process.env.MONGO as string);
    console.log("Connected to database : ", mongoose.connection.name);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error("Failed to connect to database: " + errorMessage);
  }
}
