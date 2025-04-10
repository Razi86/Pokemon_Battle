import { Schema, model } from "mongoose";

const leaderboardSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Leaderboard", leaderboardSchema);
