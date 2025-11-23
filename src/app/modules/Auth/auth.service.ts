import bcrypt from "bcrypt";
import prisma from "../../../shared/prisma.js";
import jwt from "jsonwebtoken";
import { jwtHelpers } from "../../../helpers/jwtHelpers.js";
import { is } from "zod/locales";

type DecodedToken = {
  email: string;
  role: string;
};

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new Error("Invalid password");
  }

  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    "secretkey",
    "5m"
  );

  const refreshToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    "secretkey1",
    "30d"
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

const refreshToken = async (token: string) => {
  let decodedData: DecodedToken;
  try {
    decodedData = jwt.verify(token, "secretkey1") as DecodedToken;
  } catch (error) {
    throw new Error("You are not authorized to access this route");
  }

  const isUserExist = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData.email,
    },
  });

  const accessToken = jwtHelpers.generateToken(
    {
      email: isUserExist.email,
      role: isUserExist.role,
    },
    "secretkey",
    "5m"
  );

  return {
    accessToken,
    needPasswordChange: isUserExist.needPasswordChange,
  };
};

export const authService = {
  loginUser,
  refreshToken,
};
