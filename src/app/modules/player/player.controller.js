import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { PlayerService } from "./player.service.js";

const getAllPlayerFromDB = catchAsync(async (req, res) => {
  const result = await PlayerService.getAllPlayerFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Students are retrieved successfully",
    data: result,
  });
});

const getByIdFromDB = catchAsync(async (req, res) => {
  const result = await PlayerService.getByIdFromDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student retrieved successfully",
    data: result,
  });
});

const updateOneFromDB = catchAsync(async (req, res) => {
  const result = await PlayerService.updateOneFromDB(req.params.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student updated successfully",
    data: result,
  });
});

export const PlayerController = {
  getAllPlayerFromDB,
  getByIdFromDB,
  updateOneFromDB,
};
