import express from "express";

import uploadFile from "../middlewares/uploadFile.js";
import {
  addTeamate,
  deleteTeamate,
  editTeamate,
  GetAllTeam,
  GetOneTeam,
} from "../controllers/teamController.js";

const router = express.Router();

router.get("/", GetAllTeam);
router.get("/:id", GetOneTeam);
router.put("/:id", editTeamate);
router.post("/", uploadFile, addTeamate);
router.delete("/:id", deleteTeamate);

export default router;
