import Leaderboard from "../schemas/leaderboardSchema.js"
import User from "../schemas/userSchema.js"
import { CustomError } from "../utils/errorHandler.js";
import asyncHandler from "../utils/asyncHandler.js";


export const getAllScores= asyncHandler(async(req,res) => {
    const scores= await Leaderboard.find().populate('user','first_name last_name email image').sort({score:-1}).limit(3);

    res.status(200).json({scores,user: req.user});
})

export const createScore= asyncHandler(async(req,res) => {
    const userId=req.params.id;
    const {score} = req.body;

    const user= await User.findById(userId);

    if(!user)
        throw new CustomError("user not found",404);

    const newScore= new Leaderboard({
        score,
        user:userId
    })

    await newScore.save();

    res.status(201).json(newScore);
})
