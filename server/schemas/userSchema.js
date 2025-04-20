import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
      unique: true,
      minlength: 2,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    role: { type: String, default: "user", enum: ["user", "admin"] },
    image: {
      type: String,
      default:
        "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671138.jpg?t=st=1744816231~exp=1744819831~hmac=dc6a1669707e8e09b0e01be15baa665bf3b20a4d4fb4a0845d212074e7362efc&w=900",
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("User", userSchema);
