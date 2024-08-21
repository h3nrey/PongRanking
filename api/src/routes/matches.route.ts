import express from "express";
import { create, Delete, deleteAlle, get, list, update } from "../controllers/matches.controller";
export const router = express.Router();


router.get("/:id", get);
router.get("/", list);
router.post("/", create);
router.delete("/:id", Delete);
router.put("/:id",update);
router.delete("/",deleteAlle)