import express from "express";
import {
 createUser,
 loginUser,
 logoutUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} from "../controllers/userController.js";
import { validateLogin,validateSignUp,validateUpdateUser } from "../middlewares/joiValidation.js";

const router = express.Router();
router.post(`/register`,validateSignUp,createUser);
router.post(`/login`,validateLogin,loginUser);
router.post(`/logout`, logoutUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id",validateUpdateUser,updateUser);
router.delete("/:id", deleteUser);

export default router;
