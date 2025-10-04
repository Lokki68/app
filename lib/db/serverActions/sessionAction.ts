"use server";

import { connectToDb } from "@/lib/utils/db/connectToDb";
import bcrypt from "bcryptjs";
import slugify from "slugify";
import { User } from "../models/user";

export async function register(formData) {
  const { username, email, password, passwordRepeat } =
    Object.fromEntries(formData);

  try {
    await connectToDb();

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      throw new Error("Username or email already in use");
    }

    const normalizedUsername = slugify(username, { lower: true, strict: true });

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await new User({
      username,
      normalizedUsername,
      email,
      password: hashedPassword,
    });

    console.log("newUser ->", newUser);

    await newUser.save();

    return { success: true };
  } catch (error) {
    console.error(" Error during registration:", error);

    throw new Error("Registration failed");
  }
}

export async function login() {}

export async function logout() {}
