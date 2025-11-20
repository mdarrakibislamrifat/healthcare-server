import { type Request, type Response } from "express";
import { adminService } from "./admin.service.js";
import pick from "../../../shared/pick.js";
import { adminFilterableFields } from "./admin.constant.js";
import sendResponse from "../../../shared/sendResponse.js";

const getAllFromDB = async (req: Request, res: Response) => {
  try {
    const filter = pick(req.query, adminFilterableFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

    const result = await adminService.getAllFromDB(filter, options);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Admins fetched successfully",
      meta: result.meta,
      data: result.data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch admins",
      error: error,
    });
  }
};

const getByIdFromDB = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result = await adminService.getByIdFromDB(id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Admins fetched by ID",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch admins",
      error: error,
    });
  }
};

const updateFromDB = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result = await adminService.updateIntoDB(id, req.body);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Admins update successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch admins",
      error: error,
    });
  }
};

const deleteFromDB = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result = await adminService.deleteFromDB(id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Admins Deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch admins",
      error: error,
    });
  }
};

const softDeleteFromDB = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result = await adminService.softDeleteFromDB(id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Admin Deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch admins",
      error: error,
    });
  }
};

export const AdminController = {
  getAllFromDB,
  getByIdFromDB,
  updateFromDB,
  deleteFromDB,
  softDeleteFromDB,
};
