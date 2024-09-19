import express from "express";
import { get, login, register } from "../controllers/users.controller";
import { protect } from "../middleware/authMiddleware";
export const router = express.Router();

router.get("/login", login);
router.post("/register", register);
router.get("/:id", protect, get);
