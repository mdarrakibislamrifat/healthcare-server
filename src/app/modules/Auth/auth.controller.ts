import httpStatus from "http-status";
import type { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync.js";
import { authService } from "./auth.service.js";
import sendResponse from "../../../shared/sendResponse.js";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.loginUser(req.body);
  const refreshToken = result.refreshToken;
  res.cookie("refreshToken", refreshToken, {
    secure: false,
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User login successfully",
    data: {
      accessToken: result.accessToken,
      needPasswordChange: result.needPasswordChange,
    },
  });
});

export const AuthController = {
  loginUser,
};
