import express, {Request, Response} from "express";
import { get } from "../controllers/players.controller";
export const router = express.Router();

router.get("/", get);
