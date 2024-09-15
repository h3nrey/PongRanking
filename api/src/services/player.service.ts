import { Player, Rating } from "@prisma/client";
import { OrderTypes, Sortfields } from "../constants";
import prisma from "../lib/prisma";
import { json } from "body-parser";

async function listPlayers(
  page: number,
  totalRows: number,
  sortField: string,
  order: string
) {
  page = page < 0 ? 0 : page;

  let players = await prisma.player.findMany({
    skip: page,
    take: totalRows,
    orderBy:
      order == "asc"
        ? {
            name: "asc",
          }
        : {
            name: "desc",
          },
    include: {
      Rating: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
      grip: true,
    },
  });

  if (sortField == Sortfields.Rating) {
    players = players.sort((a, b) => {
      const aLatestRating = a.Rating[0]?.score || 0;
      const bLatestRating = b.Rating[0]?.score || 0;

      if (order == OrderTypes.ASC) {
        return aLatestRating - bLatestRating;
      }
      return bLatestRating - aLatestRating;
    });
  }

  return players;
}

async function getPlayer(id: string) {
  let player = await prisma.player.findFirst({
    where: {
      id,
    },
    include: {
      Rating: {
        select: {
          score: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      grip: true,
      matches: {
        select: {
          players: true,
          winnerId: true,
          type: true,
          startedAt: true,
          games: true,
          maxPoints: true,
        },
        orderBy: {
          startedAt: "desc",
        },
      },
    },
  });

  const rating = await prisma.rating.findFirst({
    where: {
      playerId: id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // const newPlayer = { ...player, ranking: 0 };

  if (rating && player) {
    const betterPlayers: { count: number }[] = await prisma.$queryRaw`
    SELECT COUNT(*)
    FROM "Player" p
    INNER JOIN (
      SELECT r."playerId", MAX(r."createdAt") as max_created_at
      FROM "Rating" r
      GROUP BY r."playerId"
    ) as latest
    ON p.id = latest."playerId"
    INNER JOIN "Rating" r2
    ON r2."playerId" = latest."playerId" AND r2."createdAt" = latest.max_created_at
    WHERE r2.score > ${rating?.score}
  `;

    const rank = Number(betterPlayers[0].count);
    return { ...player, ranking: rank + 1 };
  }

  return player;
}

async function createPlayer(data: Player) {
  try {
    const player = await prisma.player.create({
      data: {
        name: data.name,
        Rating: {
          create: {
            score: 0,
          },
        },
        grip: {
          connect: { id: data.gripId },
        },
      },
    });
    return `The player ${player.id} was created successfully`;
  } catch (error) {
    console.log(error);
    return `player was not created`;
  }
}

async function updatePlayer(id: string, data: any) {
  try {
    const res = await prisma.player.update({
      where: {
        id,
      },
      data: {
        name: data.name,
      },
    });
    return `player data updated sucessfully`;
  } catch (error) {
    return `No player was found with this id: ${id}`;
  }
}

async function updatePlayerRating(data: { id: string; score: number }) {
  const updatedPlayer = await prisma.player.update({
    where: {
      id: data.id,
    },
    data: {
      Rating: {
        create: {
          score: data.score,
        },
      },
    },
  });
  console.log(data);

  return updatedPlayer;
}

async function DeletePlayer(id: string) {
  try {
    await prisma.rating.deleteMany({
      where: {
        playerId: id,
      },
    });
    await prisma.player.delete({
      where: {
        id,
      },
    });
    return `player data updated sucessfully`;
  } catch (error) {
    console.log(error);
    return `No player was found with this id: ${id}`;
  }
}

export {
  listPlayers,
  getPlayer,
  createPlayer,
  updatePlayer,
  updatePlayerRating,
  DeletePlayer,
};
