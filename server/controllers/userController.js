import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendError } from "../utils/SendError.js";

export async function GetAllUsers(_, res) {
  try {
    const users = await User.find();
    if (!users) return res.status(404).json({ message: "Users not found" });
    return res.status(200).json({ data: users });
  } catch (error) {
    sendError(res);
  }
}

export async function GetOneUser(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "Users not found" });
    return res.status(200).json({ data: user });
  } catch (error) {
    sendError(res);
  }
}

export async function CreateNewUser(req, res) {
  try {
    const { fullName, password, phoneNumber } = req.body;

    if (!fullName || !password || !phoneNumber) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const phoneRegex = /^\+998\d{9}$/;
    if (!phoneRegex.test(phoneNumber)) {
      return res.status(400).json({ message: "Invalid phone number format." });
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long and contain at least one letter and one number.",
      });
    }

    const existingUser = await User.findOne({ phoneNumber });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Phone number already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      fullName,
      phoneNumber,
      password: hashedPassword,
      avatar: `https://avatar.iran.liara.run/public/boy?username=${fullName
        .split(" ")
        .join("")}`,
    });
    await user.save();

    return res.status(201).json({
      message: "User created successfully.",
      data: { fullName: user.fullName, phoneNumber: user.phoneNumber },
    });
  } catch (error) {
    sendError(res);
  }
}

export async function LoginUser(req, res) {
  try {
    const { phoneNumber, password } = req.body;

    if (!phoneNumber || !password) {
      return res
        .status(400)
        .json({ message: "Phone number and password are required." });
    }

    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
      expiresIn: "7d",
    });

    return res.status(200).json({
      message: "Login successful.",
      token,
      user: { fullName: user.fullName, phoneNumber: user.phoneNumber },
    });
  } catch (error) {
    sendError(res);
  }
}

export async function UpdateUser(req, res) {
  try {
    const { id } = req.params;
    const { fullName, phoneNumber } = req.body;

    if (!fullName && !phoneNumber) {
      return res.status(400).json({
        message:
          "At least one field (fullName or phoneNumber) is required for update.",
      });
    }

    const updates = {};
    if (fullName) updates.fullName = fullName;
    if (phoneNumber) updates.phoneNumber = phoneNumber;

    const user = await User.findByIdAndUpdate(id, updates, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json({
      message: "User updated successfully.",
      data: user,
    });
  } catch (error) {
    sendError(res);
  }
}

export async function DeleteUser(req, res) {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    sendError(res);
  }
}

export const GetMe = async (req, res) => {
  try {
    const foundUser = await User.findById(req.userInfo.userId);
    if (!foundUser)
      return res.status(404).json({ message: "Admin not found!" });
    return res.status(200).json({ data: foundUser });
  } catch (error) {
    return res.status(500).json({ message: "admin not found" });
  }
};
