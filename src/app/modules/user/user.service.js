import httpStatus from "http-status";
import mongoose from "mongoose";
import AppError from "../../errors/AppError.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";
import { Player } from "../player/player.model.js";
import { User } from "./user.model.js";

// register player as a user
const insertIntoDB = async (req) => {
  const {
    email,
    mobile,
    password,
    fullName,
    village,
    playerRole,
    battingStyle,
  } = req.body;

  const userData = {};
  const playerData = {};

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const avatarLocalPath = req.file?.path;
    // const avatarLocalPath = req.files?.avatar[0]?.path;
    // console.log("localPath", avatarLocalPath);

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    // console.log(avatar.url);

    // set userData
    userData.fullName = fullName;
    userData.email = email;
    userData.mobile = mobile;
    userData.password = password;
    userData.role = "player";
    userData.avatar = avatar.url;

    const newUser = await User.create([userData], { session });
    // console.log(newUser[0]._id);
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create player");
    }

    // const createdUser = await User.findById(newUser[0]._id).select("-password");
    // console.log(createdUser);

    // set player data
    playerData.user = newUser[0]._id;
    playerData.profileImage = avatar.url;
    playerData.fullName = fullName;
    playerData.village = village;
    playerData.playerRole = playerRole;
    playerData.battingStyle = battingStyle;

    const newPlayer = await Player.create([playerData], { session });

    await session.commitTransaction();
    await session.endSession();

    if (!newPlayer.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create player");
    }

    return newPlayer;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

// delete user
const deleteUserFromDB = async (id) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletePlayer = await Player.findOneAndDelete(
      { user: id },
      { session }
    );
    if (!deletePlayer) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete player");
    }

    const deleteUser = await User.findOneAndDelete({ _id: id }, { session });
    if (!deleteUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete user");
    }

    await session.commitTransaction();
    await session.endSession();

    return deletePlayer;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error("Failed to delete user");
  }
};

// create admin/manager
const createAdminOrManager = async (file, payload) => {
  const imageLocalFilePath = file?.path;
  const { fullName, email, mobile, password, role } = payload;

  const uploadedImage = await uploadOnCloudinary(imageLocalFilePath);

  const adminOrManger = await User.create({
    fullName,
    email,
    password,
    mobile,
    role,
    avatar: uploadedImage?.secure_url,
  });

  const created = await User.findById(adminOrManger._id);

  if (!created) {
    throw new AppError(
      httpStatus.OK,
      "Something went wrong while creating admin or manager"
    );
  }

  return created;
};

const getAllUsers = async () => {
  const result = await User.find();

  return result;
};

const getUserById = async (id) => {
  const result = await User.findById({ _id: id });

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  return result;
};

const updateUserById = async (id, payload) => {
  const isExisted = await User.findById({ _id: id });

  if (!isExisted) {
    throw new AppError(httpStatus.NOT_FOUND, "User does not exist!");
  }

  const result = await User.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

export const UserService = {
  deleteUserFromDB,
  insertIntoDB,
  createAdminOrManager,
  getAllUsers,
  getUserById,
  updateUserById,
};
