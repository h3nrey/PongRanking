import express from "express";
import {
  get,
  handleDelete,
  login,
  register,
  update,
} from "../controllers/users.controller";
import { protect } from "../middleware/authMiddleware";
export const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/:id", protect, get);
router.put("/:id", protect, update);
router.delete("/:id", protect, handleDelete);
