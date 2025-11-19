import { type Request, type Response } from "express";
import { adminService } from "./admin.service.js";
import pick from "../../../shared/pick.js";
import { adminFilterableFields } from "./admin.constant.js";

const getAllFromDB = async (req: Request, res: Response) => {
  try {
    const filter = pick(req.query, adminFilterableFields);
    const options = pick(req.query, ["limit", "page"]);
    console.log(options);
    const result = await adminService.getAllFromDB(filter, options);
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
