import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const User = model("User", userSchema);
