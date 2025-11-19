import { type Request, type Response } from "express";
import { adminService } from "./admin.service.js";

const pick = (obj: any, keys: string[]) => {
  const finalObj: any = {};

  for (const key of keys) {
    if (obj && Object.hasOwnProperty.call(obj, key)) {
      finalObj[key] = obj[key];
    }
  }
  return finalObj;
};

const getAllFromDB = async (req: Request, res: Response) => {
  try {
    const filter = pick(req.query, [
      "name",
      "email",
      "searchTerm",
      "contactNumber",
    ]);
    const result = await adminService.getAllFromDB(filter);
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
