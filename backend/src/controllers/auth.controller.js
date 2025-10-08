import { userModel } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function register(request, response, next) {
  try {
    const { username, email, password } = request.body;

    if (!username || !email || !password) {
      return response
        .status(400)
        .json({ message: "Username, email and password is required. " });
    }

    const user = await userModel.findOne({ email });

    if (user) {
      return response.status(400).json({ message: "User is already exist. " });
    }

    const hashedPassword = await bcrypt.hash(password, 5);

    const newUser = userModel({ username, email, password: hashedPassword });

    await newUser.save();

    return response.status(201).json({ message: "Register is successful. " });
  } catch (error) {
    console.log("Error from register", error);
    return response.status(400).json({ message: "Register is failed. " });
  }
}

async function login(request, response, next) {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return response
        .status(400)
        .json({ message: "email and password is required. " });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return response.status(400).json({ message: "User not found. " });
    }

    const verifiedPassword = await bcrypt.compare(password, user.password);

    if (!verifiedPassword) {
      return response.status(400).json({ message: "password is invalid. " });
    }

    const payload = {
      userId: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(payload, "himani");

    response.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    response.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return response.status(200).json({
      message: "Login is successful.",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log("Error from login", error);
    return response.status(400).json({ message: "Login is failed." });
  }
}

async function logout(request, response, next) {
  try {
    response.clearCookie("token");

    return response.status(201).json({ message: "Logout is successful." });
  } catch (error) {
    console.log("Error from logout", error);
    return response.status(400).json({ message: "Logout is failed." });
  }
}

export { register, login, logout };
