import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { TeamService } from "./team.service.js";

const insertIntoDB = catchAsync(async (req, res) => {
  const result = await TeamService.insertIntoDB(req.file, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Team created successfully",
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req, res) => {
  const result = await TeamService.getAllFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All teams retrieved successfully",
    data: result,
  });
});

const getByIdFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await TeamService.getByIdFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Team retrieved successfully",
    data: result,
  });
});

const updateOneInDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await TeamService.updateOneInDB(id, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Team updated successfully",
    data: result,
  });
});

const deleteByIdFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await TeamService.deleteByIdFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Team deleted successfully",
    data: result,
  });
});

const addPlayer = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await TeamService.addPlayer(id, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Player added successfully",
    data: result,
  });
});

export const TeamControlller = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateOneInDB,
  deleteByIdFromDB,
  addPlayer,
};
