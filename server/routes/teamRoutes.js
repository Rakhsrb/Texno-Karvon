import express from "express";

import uploadFile from "../middlewares/uploadFile.js";
import {
  addPortfolioToTheTeamate,
  addTeamate,
  deleteTeamate,
  editTeamate,
  GetAllTeam,
  GetOneTeam,
  removePortfolioFromTheTeamate,
} from "../controllers/teamController.js";

const router = express.Router();

router.get("/", GetAllTeam);
router.get("/:id", GetOneTeam);
router.put("/:id", editTeamate);
router.post("/add-portfolio", addPortfolioToTheTeamate);
router.post("/remove-portfolio", removePortfolioFromTheTeamate);
router.post("/", uploadFile, addTeamate);
router.delete("/:id", deleteTeamate);

export default router;
