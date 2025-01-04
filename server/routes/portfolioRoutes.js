import express from "express";
import {
  addAuthorToThePortfolio,
  createPortfolio,
  deletePortfolio,
  getAllPortfolios,
  getPortfolioById,
  removeAuthorFromThePortfolio,
  updatePortfolio,
} from "../controllers/portfolioController.js";
import uploadFile from "../middlewares/uploadFile.js";

const router = express.Router();

router.get("/", getAllPortfolios);
router.get("/:id", getPortfolioById);
router.put("/:id", updatePortfolio);
router.post("/add-author", addAuthorToThePortfolio);
router.post("/remove-author", removeAuthorFromThePortfolio);
router.post("/", uploadFile, createPortfolio);
router.delete("/:id", deletePortfolio);

export default router;
