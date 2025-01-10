import express from "express";
import {
  createCareer,
  getAllCareers,
  getCareerById,
  updateCareer,
  deleteCareer,
} from "../controllers/careerController.js";

const router = express.Router();

router.post("/", createCareer);
router.get("/", getAllCareers);
router.get("/:id", getCareerById);
router.put("/:id", updateCareer);
router.delete("/:id", deleteCareer);

export default router;
