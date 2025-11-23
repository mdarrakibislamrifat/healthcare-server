import e from "express";
import jwt, { type Secret, type SignOptions } from "jsonwebtoken";

const generateToken = (
  payload: string | object | Buffer,
  secret: Secret,
  expiresIn: any
) => {
  const options: SignOptions = {
    algorithm: "HS256",
    expiresIn,
  };

  return jwt.sign(payload, secret, options);
};

export const jwtHelpers = { generateToken };
