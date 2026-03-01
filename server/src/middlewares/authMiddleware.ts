import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AuthRequest, TokenPayload } from "../types/user.types";

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction,
) => {
  const JWT_SECRET = process.env.JWT_SECRET;

  if (!JWT_SECRET) {
    throw new Error("JWT Secret is undefined!");
  }

  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer ")
  ) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = req.headers.authorization.split(" ")[1];

  try {
    const decodedToken = jwt.verify(
      token,
      JWT_SECRET,
    ) as unknown as TokenPayload;

    req.user = {
      _id: decodedToken._id,
      email: decodedToken.email,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      error: "Not authorized, token failed!",
    });
  }
};
