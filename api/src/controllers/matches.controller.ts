import { Request, response, Response } from "express";
import { createMatches, listMatches, getMatch, deleteMatch, updateMatch,deleteAll } from "../services/matches.service";

async function get(req: Request, res: Response) {
    try {
        const match = await getMatch(parseInt(req.params.id));
        res.json(match);
    } catch (error) {
        
    }
}

async function list(req: Request, res: Response) {
    try {
        const matches = await listMatches(req.query);
        res.json(matches)
    } catch (error) {
        console.log(error);
    }
}

async function create(req: Request, res: Response) {
    const data = req.body;
    
    try {
        const match = await createMatches(data);
        console.log(match)
        res.json(match);
    } catch (error) {
        console.log(error);
    }
}

async function Delete(req: Request, res: Response) {
    try {
        const response = await deleteMatch(req.params.id)
        res.json(response)
    } catch (error) {
        console.error(error);
        throw new Error();
    }
}

async function update(req: Request, res: Response) {
    const data = req.body
    const id = req.params.id
    
    try {
        const reponse = await updateMatch(id, data);
        res.json(response)
    } catch (error) {
        console.error(error);
    }
}

async function deleteAlle(req: Request, res: Response){
    await deleteAll();
    res.json();
}
export {
    get,
    create,
    list,
    Delete,
    update,
    deleteAlle
}