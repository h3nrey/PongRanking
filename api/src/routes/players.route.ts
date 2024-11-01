import express from "express";
import {
  create,
  deleteF,
  get,
  getCount,
  list,
  update,
  updateRating,
} from "../controllers/players.controller";
export const router = express.Router();

router.get("/", list);
router.get("/total", getCount);
router.get("/:id", get);
router.post("/", create);
router.put("/:id", update);
router.patch("/:id/rating", updateRating);
router.delete("/:id", deleteF);
