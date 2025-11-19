import type { Request, Response } from "express";
import { userService } from "./user.service.js";

const createAdmin = async (req: Request, res: Response) => {
  const result = await userService.createAdmin(req.body);
  try {
    res.status(200).json({
      success: true,
      message: "Admin created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create admin",
      error: error,
    });
  }
};

export const userController = {
  createAdmin,
};
