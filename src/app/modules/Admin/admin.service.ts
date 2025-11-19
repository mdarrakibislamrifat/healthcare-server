import { PrismaClient } from "../../../generated/prisma/client.js";

const prisma = new PrismaClient();

const getAllFromDB = async (params: any) => {
  const { searchTerm, ...filterData } = params;
  const andConditions = [];
  const adminSearchableFields = ["name", "email"];

  if (params.searchTerm) {
    andConditions.push({
      OR: adminSearchableFields.map((field) => ({
        [field]: {
          contains: params.searchTerm || "",
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: filterData[key],
        },
      })),
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
