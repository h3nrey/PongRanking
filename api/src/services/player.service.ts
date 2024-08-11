import { Player } from "@prisma/client";
import { OrderTypes, Sortfields } from "../constants";
import prisma from "../lib/prisma";

async function listPlayers(page: number, totalRows: number, sortField: string, order: string) {
    page = page < 0 ? 0 : page

    let players = await prisma.player.findMany({
        skip: page,
        take: totalRows,
        orderBy: order == "asc" ? {
            name: "asc"
        } : { 
            name: "desc"
        },
        include: {
            Rating: {
                orderBy: {
                    createdAt: 'desc',
                },
                take: 1,
            }
        },
    });

    if(sortField == Sortfields.Rating) {
        players = players.sort((a, b) => {
            const aLatestRating = a.Rating[0]?.score || 0;
            const bLatestRating = b.Rating[0]?.score || 0;
    
            if(order == OrderTypes.ASC){
                return aLatestRating - bLatestRating;
            }
            return bLatestRating - aLatestRating;
        });
    }

    return players;
}


async function getPlayer(id: string) {
    const player = await prisma.player.findUniqueOrThrow({
        where: {
            id,
        },
        include: {
            Rating: {
                select:{
                    score: true,
                }
            },
            PlayersMatches: true
        }
    })
    .catch(() => {
        return `No player  was found with this id: ${id}`
    });

    return player;
}

async function updatePlayer(id: string, data: any) {
    try {
        const res = await prisma.player.update({
            where:{
                id,
            },
            data: {
                name: data.name
            }
        })
        return `player data updated sucessfully`
    } catch (error) {
        return `No player was found with this id: ${id}`
    }
    
}

async function updatePlayerRating(id: string, score: number){
    await prisma.rating.create({
        data: {
            score: score,
            playerId: id,
        }
    })
}

async function DeletePlayer(id: string) {
    try {
        await prisma.rating.deleteMany({
            where:{
                playerId:id
            }
        })
        await prisma.player.delete({
            where: {
                id,
            }
        })
        return `player data updated sucessfully`
    } catch(error) {
        console.log(error)
        return `No player was found with this id: ${id}`
    }
}



export {
    listPlayers,
    getPlayer,
    updatePlayer,
    DeletePlayer
}