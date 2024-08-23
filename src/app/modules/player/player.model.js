import { model, Schema } from "mongoose";

const playerSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: "User",
    },
    profileImage: {
      type: String,
      default: "",
    },
    team: {
      type: Schema.Types.ObjectId,
      ref: "Team",
    },
    fullName: {
      type: String,
      required: true,
    },
    village: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    playerRole: {
      type: String,
      required: true,
      enum: ["batsman", "bowler", "all-rounder", "wicketkeeper"],
    },
    battingStyle: {
      type: String,
      enum: ["right-hand", "left-hand"],
      required: true,
    },
    bowlingStyle: {
      type: String,
      enum: [
        "right-arm fast",
        "right-arm medium",
        "right-arm spin",
        "left-arm fast",
        "left-arm medium",
        "left-arm spin",
        "none",
      ],
      default: "none",
    },
    matches: {
      type: Number,
      default: 0,
    },
    innings: {
      type: Number,
      default: 0,
    },
    runs: {
      type: Number,
      default: 0,
    },
    ballFaced: {
      type: Number,
      default: 0,
    },
    strkeRate: {
      type: Number,
      default: 0,
    },
    wickets: {
      type: Number,
      default: 0,
    },
    overs: {
      type: Number,
      default: 0,
    },
    bowlerBest: {
      type: Number,
      default: 0,
    },
    highestScore: {
      type: Number,
      default: 0,
    },
    thirties: {
      type: Number,
      default: 0,
    },
    fifties: {
      type: Number,
      default: 0,
    },
    hundreds: {
      type: Number,
      default: 0,
    },
    fours: {
      type: Number,
      default: 0,
    },
    sixs: {
      type: Number,
      default: 0,
    },
    notOut: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Player = model("Player", playerSchema);
