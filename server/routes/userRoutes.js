import express from "express";
import {
  createUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  checkSession,
} from "../controllers/userController.js";
import {
  validateLogin,
  validateSignUp,
  validateUpdateUser,
} from "../middlewares/joiValidation.js";
import { auth } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.post(`/register`, validateSignUp, createUser);
router.post(`/login`, validateLogin, loginUser);
router.post(`/logout`, logoutUser);
router.get("/check-session",auth, checkSession);

router.get("/",auth, getAllUsers);
router.get("/:id",auth, getUserById);
router.put("/:id",auth, validateUpdateUser, updateUser);
router.delete("/:id",auth, deleteUser);

export default router;
