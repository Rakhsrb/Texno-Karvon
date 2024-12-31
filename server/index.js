import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import UserRoutes from "./routes/userRoutes.js";
import PortfolioRoutes from "./routes/portfolioRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/users", UserRoutes);
app.use("/portfolios", PortfolioRoutes);

async function runApp() {
  try {
    mongoose.connect(process.env.MONGODB_URI);
    const PORT = (process.env.PORT = 3000);
    app.listen(PORT, () =>
      console.log(`Server running at http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
  }
}

runApp();
