import { Request, Response } from "express";
import {
  createPlayer,
  DeletePlayer,
  getPlayer,
  listPlayers,
  updatePlayer,
  updatePlayerRating,
} from "../services/player.service";
import { Sortfields } from "../constants";
import prisma from "../lib/prisma";

async function list(req: Request, res: Response) {
  let page = typeof req.query.page === "string" ? req.query.page : "0";
  let totalRows =
    typeof req.query.totalRows === "string" ? req.query.totalRows : "0";
  let sort =
    typeof req.query.sort === "string" ? req.query.sort : Sortfields.Name;
  let order = typeof req.query.order === "string" ? req.query.order : "desc";
  try {
    const players = await listPlayers(
      parseInt(page),
      parseInt(totalRows),
      sort,
      order
    );
    res.json(players);
  } catch {
    res.send("error");
  }
}

async function getCount(req: Request, res: Response) {
  const totalPlayers = await prisma.player.count();
  res.json(totalPlayers);
}

async function get(req: Request, res: Response) {
  const playerId = req.params.id;

  try {
    const player = await getPlayer(playerId);
    res.json(player);
  } catch (error) {}
}

async function create(req: Request, res: Response) {
  const data = req.body;

  try {
    const player = await createPlayer(data);
    res.json(player);
  } catch (error) {
    console.log(error);
  }
}

async function update(req: Request, res: Response) {
  const playerId = req.params.id;
  const data = req.body;

  try {
    const player = await updatePlayer(playerId, data);
    res.json(player);
  } catch (error) {}
}

async function deleteF(req: Request, res: Response) {
  const playerId = req.params.id;

  try {
    const player = await DeletePlayer(playerId);
    res.json(player);
  } catch (error) {}
}

async function updateRating(req: Request, res: Response) {
  try {
    const response = await updatePlayerRating({
      id: req.params.id,
      score: req.body.score,
    });
    res.json(response);
  } catch (error) {
    console.error(error);
  }
}

export { list, getCount, get, create, update, deleteF, updateRating };
