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

  const offset = (page - 1) * totalRows;
  const sortOrder = order === "asc" ? "ASC" : "DESC";

  const listQuery = `
  SELECT p.*, r.score AS "latestRating"
  FROM "Player" p
  LEFT JOIN "Rating" r ON r."playerId" = p.id
  WHERE r."createdAt" = (
    SELECT MAX("createdAt")
    FROM "Rating" r2
    WHERE r2."playerId" = p.id
  )
  ORDER BY "latestRating" ${sortOrder}
  OFFSET ${offset}
  LIMIT ${totalRows}
`;

  const players = await prisma.$queryRawUnsafe(listQuery);

  console.log(players);
  return players;
}

async function getPlayer(idText: string) {
  let id = parseInt(idText);
  let player = await prisma.player.findFirst({
    where: {
      id: id,
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
        user: {
          connect: { id: data.userId },
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
        id: parseInt(id),
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
      id: parseInt(data.id),
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
        playerId: parseInt(id),
      },
    });
    await prisma.player.delete({
      where: {
        id: parseInt(id),
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
