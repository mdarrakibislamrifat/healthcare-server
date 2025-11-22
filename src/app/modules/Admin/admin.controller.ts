import {
  type NextFunction,
  type Request,
  type RequestHandler,
  type Response,
} from "express";
import httpStatus from "http-status";
import { adminService } from "./admin.service.js";
import pick from "../../../shared/pick.js";
import { adminFilterableFields } from "./admin.constant.js";
import sendResponse from "../../../shared/sendResponse.js";

const catchAsync = (fn: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

const getAllFromDB: RequestHandler = catchAsync(async (req, res) => {
  const filter = pick(req.query, adminFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await adminService.getAllFromDB(filter, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admins fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getByIdFromDB: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await adminService.getByIdFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admins fetched by ID",
    data: result,
  });
});

const updateFromDB: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await adminService.updateIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admins update successfully",
    data: result,
  });
});

const deleteFromDB: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await adminService.deleteFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admins Deleted successfully",
    data: result,
  });
});

const softDeleteFromDB: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await adminService.softDeleteFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin Deleted successfully",
    data: result,
  });
});

export const AdminController = {
  getAllFromDB,
  getByIdFromDB,
  updateFromDB,
  deleteFromDB,
  softDeleteFromDB,
};
