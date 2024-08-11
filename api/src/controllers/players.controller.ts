import { Request, Response } from "express";
import { listPlayers } from "../services/player.service";
import prisma from "../lib/prisma";

async function get(req: Request, res: Response) {
    const page = req.body.page

    try{
        const players = await prisma.player.findMany()
        console.log(page)
        res.json(await players)
    } catch{
        res.send("error");
    }
}

export {
    get,
}