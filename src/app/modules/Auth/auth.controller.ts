import httpStatus from "http-status";
import type { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync.js";
import { authService } from "./auth.service.js";
import sendResponse from "../../../shared/sendResponse.js";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.loginUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User login successfully",
    data: result,
  });
});

export const AuthController = {
  loginUser,
};
