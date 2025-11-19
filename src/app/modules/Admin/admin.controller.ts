import { type Request, type Response } from "express";
import { adminService } from "./admin.service.js";

const getAllFromDB = async (req: Request, res: Response) => {
  try {
    const result = await adminService.getAllFromDB(req.query);
    res.status(200).json({
      success: true,
      message: "Admins fetched successfully",
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
};
