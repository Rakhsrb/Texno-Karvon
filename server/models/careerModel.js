import mongoose from "mongoose";

const CareerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  salary: {
    from: { type: Number, required: true, min: 0 },
    to: { type: Number, required: true, min: 0 },
  },
  requirements: { type: [String], default: [] },
  tasks: { type: [String], default: [] },
});

export default mongoose.model("Career", CareerSchema);
