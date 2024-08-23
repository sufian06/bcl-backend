import httpStatus from "http-status";
import mongoose from "mongoose";
import AppError from "../../errors/AppError.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";
import { Player } from "../player/player.model.js";
import { Team } from "./team.model.js";

const insertIntoDB = async (file, payload) => {
  const logoLocalPath = file?.path;
  const { teamName } = payload;

  const teamLogo = await uploadOnCloudinary(logoLocalPath);

  const team = await Team.create({
    teamName,
    teamLogo: teamLogo?.url || "",
  });

  const createdTeam = await Team.findById(team._id);

  if (!createdTeam) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Something went wrong while creating the team"
    );
  }

  return createdTeam;
};

const getAllFromDB = async () => {
  const result = await Team.find();

  return result;
};

const getByIdFromDB = async (id) => {
  const result = await Team.findById(id);

  return result;
};

const updateOneInDB = async (id, payload) => {
  const result = await Team.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

const deleteByIdFromDB = async (id) => {
  const result = await Team.findByIdAndDelete({ _id: id });

  return result;
};

const addPlayer = async (id, payload) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // add player id to team
    const result = await Team.findByIdAndUpdate(
      { _id: id },
      { $push: payload },
      { new: true }
    ).populate("players");

    if (!result) {
      throw new AppError(httpStatus.BAD_REQUEST, "Team not found!");
    }

    // set team id to player
    const addTeamToPlayer = await Player.findOneAndUpdate(
      { _id: payload.players },
      { $set: { team: id } },
      { new: true }
    ).populate("team");

    if (!addTeamToPlayer) {
      throw new AppError(httpStatus.BAD_REQUEST, "Player not found!");
    }

    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

export const TeamService = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateOneInDB,
  deleteByIdFromDB,
  addPlayer,
};
