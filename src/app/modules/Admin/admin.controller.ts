import { type NextFunction, type Request, type Response } from "express";
import httpStatus from "http-status";
import { adminService } from "./admin.service.js";
import pick from "../../../shared/pick.js";
import { adminFilterableFields } from "./admin.constant.js";
import sendResponse from "../../../shared/sendResponse.js";

const getAllFromDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

const getByIdFromDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  try {
    const result = await adminService.getByIdFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admins fetched by ID",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateFromDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  try {
    const result = await adminService.updateIntoDB(id, req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admins update successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteFromDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  try {
    const result = await adminService.deleteFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admins Deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const softDeleteFromDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  try {
    const result = await adminService.softDeleteFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin Deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const AdminController = {
  getAllFromDB,
  getByIdFromDB,
  updateFromDB,
  deleteFromDB,
  softDeleteFromDB,
};
