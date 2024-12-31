import express from "express";
import {
  createPortfolio,
  deletePortfolio,
  getAllPortfolios,
  getPortfolioById,
  updatePortfolio,
} from "../controllers/portfolioController.js";
import uploadFile from "../middlewares/uploadFile.js";

const router = express.Router();

router.get("/", getAllPortfolios);
router.get("/:id", getPortfolioById);
router.put("/:id", updatePortfolio);
router.post("/", uploadFile, createPortfolio);
router.delete("/:id", deletePortfolio);

export default router;
