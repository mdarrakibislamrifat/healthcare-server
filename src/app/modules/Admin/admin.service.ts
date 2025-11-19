import { PaginationHelpers } from "../../../helpers/paginationHelper.js";
import prisma from "../../../shared/prisma.js";
import { adminSearchableFields } from "./admin.constant.js";

const getAllFromDB = async (params: any, options: any) => {
  const { limit, page, skip } = PaginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = params;
  const andConditions = [];

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
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
  });
  return result;
};

export const adminService = {
  getAllFromDB,
};
