import mongoose from "mongoose";

export async function connectToDb() {
  if (mongoose.connection.readyState) {
    console.log("Using existing connection :", mongoose.connection.name)
  }

  try {
    const mongoConnectUrl = process.env.MONGO || ''
    await mongoose.connect(mongoConnectUrl)
    console.log("Connected to database : ", mongoose.connection.name)
  } catch (error) {
    throw new Error("Failed to connect to database")

  }
}
