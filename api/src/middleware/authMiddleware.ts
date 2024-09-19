import * as jwt from "jsonwebtoken";
import * as asyncHandler from "express-async-handler";
import prisma from "../lib/prisma";
const protect = asyncHandler.default(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      if (!process.env.JWT_SECRET) return;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      console.log(decoded);
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export { protect };
