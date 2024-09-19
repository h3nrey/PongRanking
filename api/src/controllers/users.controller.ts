import { Request, response, Response } from "express";
import { getUser, loginUser, registerUser } from "../services/users.service";

async function login(req: Request, res: Response) {
  console.log("teste");
  try {
    const data = await loginUser(req.body);
    res.json(data);
  } catch (error) {}
}

async function register(req: Request, res: Response) {
  try {
    const data = await registerUser(req.body);
    res.json(data);
  } catch (error) {}
}

async function get(req: Request, res: Response) {
  try {
    const data = await getUser(req.params.id);
    res.json(data);
  } catch (error) {}
}
export { login, register, get };
