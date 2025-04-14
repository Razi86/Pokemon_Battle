import express from "express";
import {
  createScore,
  getAllScores,
  // getScoreById,
  // updateScore,
  // deleteScore,
} from "../controllers/leaderboardController.js";
import { validateScore } from "../middlewares/joiValidation.js";

const router = express.Router();

router.post("/:id",validateScore, createScore);
router.get("/", getAllScores);
// router.get("/:id", getScoreById);
// router.put("/:id", updateScore);
// router.delete("/:id", deleteScore);

export default router;
