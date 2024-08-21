import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse.js";
import { User } from "./user.model.js";

const insertIntoDB = async (req, res) => {
  const result = await User.create(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User created successfully",
    data: result,
  });
};

const deleteUserFromDB = async (id) => {
  const result = await User.findByIdAndDelete(id);

  return result;
};

export const UserService = { deleteUserFromDB, insertIntoDB };
