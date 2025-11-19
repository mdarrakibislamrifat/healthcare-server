import { PrismaClient } from "../../../generated/prisma/client.js";
type AdminQueryParams = {
  searchTerm?: string;
};
const prisma = new PrismaClient();

const getAllFromDB = async (params: AdminQueryParams) => {
  const andConditions = [];
  if (params.searchTerm) {
    andConditions.push({
      OR: [
        {
          name: {
            contains: params.searchTerm || "",
            mode: "insensitive" as const,
          },
        },
        {
          email: {
            contains: params.searchTerm || "",
            mode: "insensitive" as const,
          },
        },
      ],
    });
  }

  const whereConditions = andConditions.length ? { AND: andConditions } : {};

  const result = await prisma.admin.findMany({
    where: whereConditions,
  });
  return result;
};

export const adminService = {
  getAllFromDB,
};
