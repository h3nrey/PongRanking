import { Request, Response } from "express";
import { listPlayers } from "../services/player.service";

async function get(req: Request, res: Response) {
    const page = req.body.page

    try{
        console.log(page)
        res.json(await listPlayers(0))
    } catch{
        res.send("error");
    }
}

export {
    get,
}