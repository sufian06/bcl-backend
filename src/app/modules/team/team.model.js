import { model, Schema } from "mongoose";

const teamSchema = new Schema(
  {
    teamName: {
      type: String,
      required: true,
      unique: true,
    },
    teamLogo: {
      type: String,
      default: "",
    },
    manager: {
      type: Schema.Types.ObjectId,
      ref: "Manager",
    },
    players: [
      {
        type: Schema.Types.ObjectId,
        ref: "Player",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Team = model("Team", teamSchema);
