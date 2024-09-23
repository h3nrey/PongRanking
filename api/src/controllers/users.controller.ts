import { Request, Response } from "express";
import {
  getUser,
  loginUser,
  registerUser,
  updateUser,
  deleteUser,
} from "../services/users.service";
import { UserReq } from "../middleware/authMiddleware";

async function login(req: Request, res: Response) {
  console.log("teste");
  try {
    const data = await loginUser(req.body);
    res.status(data.status).send(data);
  } catch (error) {}
}

async function register(req: Request, res: Response) {
  try {
    const data = await registerUser(req.body);
    res.status(data.status).json(data);
  } catch (error) {}
}

async function get(req: Request, res: Response) {
  try {
    const userId = req.params.id;
    const user = await getUser(userId);
    res.json(user);
  } catch (error) {}
}

async function update(req: Request, res: Response) {
  try {
    const userId = req.params.id;
    const user = await updateUser(userId, req.body);
    res.json(user);
  } catch (error) {}
}

async function handleDelete(req: Request, res: Response) {
  try {
    const userId = req.params.id;
    const user = await deleteUser(userId);
    res.json(user);
  } catch (error) {
    console.log(error);
  }
}
export { login, register, get, update, handleDelete };
