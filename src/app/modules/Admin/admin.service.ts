import { UserStatus, type Admin } from "../../../generated/prisma/client.js";
import { PaginationHelpers } from "../../../helpers/paginationHelper.js";
import prisma from "../../../shared/prisma.js";
import type { IPaginationOptions } from "../../interfaces/pagination.js";
import { adminSearchableFields } from "./admin.constant.js";
import type { IAdminFilterRequest } from "./admin.interface.js";

const getAllFromDB = async (
  params: IAdminFilterRequest,
  options: IPaginationOptions
) => {
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

  andConditions.push({
    isDeleted: false,
  });

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
  const total = await prisma.admin.count({
    where: whereConditions,
  });
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getByIdFromDB = async (id: string): Promise<Admin | null> => {
  const result = await prisma.admin.findUnique({
    where: {
      id: id,
      isDeleted: false,
    },
  });
  return result;
};

const deleteFromDB = async (id: string): Promise<Admin | null> => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id: id,
    },
  });

  const result = await prisma.$transaction(async (transactionClient) => {
    const adminDeletedData = await transactionClient.admin.delete({
      where: {
        id,
      },
    });
    await transactionClient.user.delete({
      where: {
        email: adminDeletedData.email,
      },
    });
    return adminDeletedData;
  });

  return result;
};

const softDeleteFromDB = async (id: string) => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id: id,
      isDeleted: false,
    },
  });

  const result = await prisma.$transaction(async (transactionClient) => {
    const adminDeletedData = await transactionClient.admin.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
      },
    });
    await transactionClient.user.update({
      where: {
        email: adminDeletedData.email,
      },
      data: {
        status: UserStatus.DELETED,
      },
    });
    return adminDeletedData;
  });

  return result;
};

const updateIntoDB = async (
  id: string,
  data: Partial<Admin>
): Promise<Admin> => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id: id,
      isDeleted: false,
    },
  });
  const result = await prisma.admin.update({
    where: {
      id: id,
    },
    data,
  });
  return result;
};

export const adminService = {
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
  softDeleteFromDB,
};
