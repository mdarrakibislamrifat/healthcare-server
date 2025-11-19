import { UserRole } from "../../../generated/prisma/enums.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import prisma from "../../../shared/prisma.js";
dotenv.config();

const createAdmin = async (data: any) => {
  const hashPassword = await bcrypt.hash(data.password, 10);

  const userData = {
    email: data.admin.email,
    password: hashPassword,
    role: UserRole.ADMIN,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });

    const createdAdminData = await transactionClient.admin.create({
      data: data.admin,
    });
    return createdAdminData;
  });

  return result;
};

export const userService = {
  createAdmin,
};
