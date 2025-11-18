import { PrismaClient } from "../../../generated/prisma/client.js";
import { UserRole } from "../../../generated/prisma/enums.js";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

const createAdmin = async (data: any) => {
  const userData = {
    email: data.admin.email,
    password: data.password,
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
