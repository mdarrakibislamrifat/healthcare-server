import { PrismaClient } from "../../../generated/prisma/client.js";

const prisma = new PrismaClient();

const getAllFromDB = async (params: any) => {
  const result = await prisma.admin.findMany({
    where: {
      OR: [
        {
          name: {
            contains: params.searchTerm || "",
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: params.searchTerm || "",
            mode: "insensitive",
          },
        },
      ],
    },
  });
  return result;
};

export const adminService = {
  getAllFromDB,
};
