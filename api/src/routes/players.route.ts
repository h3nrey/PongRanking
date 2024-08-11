import express from "express";
import { deleteF, get, list, update } from "../controllers/players.controller";
export const router = express.Router();

router.get("/", list);
router.get("/:id", get);
router.put("/:id", update);
router.delete("/:id", deleteF);