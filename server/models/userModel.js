import mongoose from "mongoose";

const User = new mongoose.Schema({
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String },
});

export default mongoose.model("User", User);
