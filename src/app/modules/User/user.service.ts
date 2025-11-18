import type { Request, Response } from "express";

const createAdmin = async (req: Request, res: Response) => {
  return {
    message: "Admin created successfully",
  };
};

export const userService = {
  createAdmin,
};
