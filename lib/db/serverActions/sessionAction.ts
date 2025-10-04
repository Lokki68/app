"use server";

import {
  FormDataLoginFields,
  FormDataRegisterFields,
} from "@/lib/types/formData";
import { connectToDb } from "@/lib/utils/db/connectToDb";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import slugify from "slugify";
import AppError from "../errorHandling/customError";
import { Session } from "../models/session";
import { User } from "../models/user";

export async function register(formData: FormData) {
  const { username, email, password, repeatPassword } = Object.fromEntries(
    formData
  ) as FormDataRegisterFields;

  try {
    if (typeof username !== "string" || username.trim().length < 3) {
      throw new AppError("Le username doit avoir plus de 3 caractères");
    }

    if (typeof password !== "string" || password.trim().length < 6) {
      throw new AppError("Le mot de passe doit avoir plus de 6 caractères");
    }

    if (password !== repeatPassword) {
      throw new AppError("Mot de passe différent de la confirmation");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof email !== "string" || !emailRegex.test(email.trim())) {
      throw new Error("Invalid email format.");
    }

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

    await newUser.save();

    return { success: true };
  } catch (error) {
    console.error(" Error during registration:", error);

    if (error instanceof AppError) {
      throw error;
    }

    throw new Error("Registration failed");
  }
}

export async function login(formData: FormData) {
  const oneWeek = 7 * 24 * 60 * 60 * 1000;

  const { username, password } = Object.fromEntries(
    formData
  ) as FormDataLoginFields;

  try {
    if (typeof username !== "string") {
      throw new AppError("Format invalide");
    }

    if (typeof password !== "string") {
      throw new AppError("Format invalide");
    }

    await connectToDb();

    const user = await User.findOne({ username });

    if (!user) {
      throw new AppError("Indentifiants invalides");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new AppError("Identifiants invalides");
    }

    let session;
    const existingSession = await Session.findOne({
      userId: user._id,
      expiresAt: { $gt: new Date() },
    });

    if (existingSession) {
      session = existingSession;
      session.expiresAt = new Date(Date.now() + oneWeek);
    } else {
      session = new Session({
        userId: user._id,
        expiresAt: new Date(Date.now() + oneWeek),
      });
    }

    await session.save();

    const cookieStore = await cookies();
    cookieStore.set("sessionId", session._id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: oneWeek / 1000,
      sameSite: "lax",
    });

    return { success: true, normalizedUsername: user.normalizedUsername };
  } catch (error) {
    console.error("Error while signing in:", error);

    if (error instanceof AppError) {
      throw error;
    }

    throw new Error("Error while signing in:");
  }
}

export async function logout() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId")?.value;

  try {
    await Session.findByIdAndDelete(sessionId);

    cookieStore.set("sessionId", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 0, // Supprime immédiatement le cookie
      sameSite: "strict",
    });

    return { success: true }; // Confirme le logOut
  } catch (error) {
    console.error(error);
  }
}
