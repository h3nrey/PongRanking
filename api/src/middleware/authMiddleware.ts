import * as jwt from "jsonwebtoken";
import * as asyncHandler from "express-async-handler";
import prisma from "../lib/prisma";
import { NextFunction, Request, Response } from "express";

declare module "jsonwebtoken" {
  export interface UserJwtPayload extends jwt.JwtPayload {
    userId: string;
  }
}

export interface UserReq extends Request {
  user: any;
}

async function protect(req: Request, res: Response, next: NextFunction) {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      const token = req.headers.authorization.split(" ")[1];

      if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
      }

      // Verify token
      if (!process.env.JWT_SECRET) return;
      const decoded = <jwt.UserJwtPayload>(
        jwt.verify(token, process.env.JWT_SECRET)
      );

      const user = await prisma.user.findUnique({
        where: {
          id: decoded.id,
        },
        select: {
          id: true,
        },
      });

      if (user && user.id) {
        req.params.id = user.id;
      }
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }
}

export { protect };
