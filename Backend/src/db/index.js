import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017";

export async function connectDatabase() {
  try {
    const connectionInstance = await mongoose.connect(
      `${MONGODB_URL}${DB_NAME}`
    );
    console.log(
      `MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (err) {
    console.log("MONGODB connection FAILED", err);
    process.exit(1);
  }
}
