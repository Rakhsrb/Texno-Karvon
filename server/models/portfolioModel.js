import mongoose from "mongoose";

const Portfolio = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, required: true },
  category: { type: String, required: true },
  photo: { type: String, required: true },
  likeCount: { type: Number, default: 0 },
  tags: [{ type: String }],
});

export default mongoose.model("Portfolio", Portfolio);
