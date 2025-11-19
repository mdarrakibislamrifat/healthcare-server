import { PrismaClient } from "../../../generated/prisma/client.js";

const prisma = new PrismaClient();

const getAllFromDB = async () => {
  const result = await prisma.admin.findMany({});
  return result;
};

export const adminService = {
  getAllFromDB,
};
