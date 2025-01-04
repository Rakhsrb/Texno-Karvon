import mongoose from "mongoose";

const Team = new mongoose.Schema({
  fullName: { type: String, required: true },
  biography: { type: String, required: true },
  role: { type: String, required: true },
  photo: { type: String, required: true },
  skills: [String],
  portfolios: [{ type: mongoose.Schema.Types.ObjectId, ref: "Portfolio" }],
});

export default mongoose.model("Team", Team);
