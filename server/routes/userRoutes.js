import express from "express";
import {
  CreateNewUser,
  DeleteUser,
  GetAllUsers,
  GetMe,
  LoginUser,
  UpdateUser,
} from "../controllers/userController.js";
import checkAuth from "../middlewares/checkAuth.js";

const router = express.Router();

router.get("/me", checkAuth, GetMe);
router.get("/", GetAllUsers);
router.post("/create", CreateNewUser);
router.post("/login", LoginUser);
router.put("/:id", UpdateUser);
router.delete("/:id", DeleteUser);

export default router;
