import { Game, Match, Player } from "@prisma/client";
import prisma from "../lib/prisma";
import { hasDuplicates } from "../utils";
import { calcElo } from "../utils/eloSystem";
import { updatePlayerRating } from "./player.service";

interface IMatch {
  players: Player[];
  games: Game[];
  winnerId: number;
  type?: string;
  maxPoints?: number;
  startedAt: Date;
}

async function getMatch(id: number) {
  if (!id) {
    return {
      data: {},
      message: "please, inform the match id!",
    };
  }

  const matches = prisma.match.findUnique({
    where: {
      id: id,
    },
    include: {
      players: true,
      games: true,
    },
  });

  return matches;
}

async function listMatches(data: any) {
  const totalRows = data.totalRows ? parseInt(data.totalRows) : 10;
  const page = data.page ? parseInt(data.page) : 0;

  const matches = await prisma.match.findMany({
    skip: page * totalRows,
    take: totalRows,
    include: {
      players: {
        include: {
          Rating: true,
        },
      },
    },
  });

  return matches;
}

async function createMatches(data: IMatch) {
  if (!data.players) {
    console.log(data);
    return {
      data: {},
      message: "It hasnt the minumum of players to create a match",
    };
  }

  const hasRepeatedPlayer = hasDuplicates(
    data.players.map((player) => player.id)
  );
  if (hasRepeatedPlayer) {
    return {
      data: {},
      message: "A match can not be created with duplicated players",
    };
  }

  try {
    const createdMatch = await prisma.match.create({
      data: {
        type: data.type,
        maxPoints: data.maxPoints,
        startedAt: data.startedAt,
        winnerId: data.winnerId,
        players: {
          connect: data.players.map((player) => ({ id: player.id })),
        },
        games: {
          createMany: {
            data: data.games,
          },
        },
      },
      include: {
        games: true,
        players: {
          include: {
            Rating: {
              select: {
                score: true,
              },
              take: 1,
              orderBy: {
                createdAt: "desc",
              },
            },
            matches: true,
          },
        },
      },
    });

    const players = createdMatch.players.map((player) => ({
      id: player.id,
      score: player.Rating[0].score,
      matches: player.matches.length,
    }));
    const scores = calcElo(players[0].score, players[1].score, 1);

    console.log(scores);
    players.forEach((player, i) => {
      updatePlayerRating({ id: player.id.toString(), score: scores[i] });
    });

    return {
      data: createdMatch,
      message: "Match was created sucessfully",
    };
  } catch (error) {
    console.log(error);
  }

  return {
    data: {},
    message: "Match was not created",
  };
}

async function deleteAll() {
  await prisma.match.deleteMany({
    where: {
      type: "single",
      games: {},
    },
  });
  return;
}

async function deleteMatch(id: string) {
  let matchId = parseInt(id);

  try {
    const hasMatch = await prisma.match.findUnique({ where: { id: matchId } });

    if (!hasMatch)
      return { data: {}, message: "Theres not match with the provided ID" };

    console.log(hasMatch);

    await prisma.game.deleteMany({
      where: {
        matchId: matchId,
      },
    });

    await prisma.match.delete({
      where: {
        id: matchId,
        games: {},
      },
    });

    return {
      data: {},
      message: "match was sucessfully deleted",
    };
  } catch (error) {
    console.log(error);
    return {
      data: {},
      message: "match could not be deleted",
    };
  }
}

async function updateMatch(id: string, data: any) {
  const match = await prisma.match.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      players: true,
    },
  });

  if (!match) {
    return "no match with the provided id";
  }

  if (data.games) {
    await prisma.game.deleteMany({
      where: {
        matchId: parseInt(id),
      },
    });

    await prisma.game.createMany({
      data: data.games.map((game: Game) => ({
        matchId: parseInt(id),
        points: game.points,
      })),
    });
  }

  const updatedMatch = await prisma.match.update({
    where: {
      id: parseInt(id),
    },
    data: {
      type: data.type,
      maxPoints: data.maxPoints,
      players: {
        disconnect: match.players.map((player) => ({ id: player.id })),
        connect: data.players.map((player: Player) => ({ id: player.id })),
      },
    },
  });
  return updatedMatch;
}
export {
  listMatches,
  getMatch,
  createMatches,
  deleteMatch,
  updateMatch,
  deleteAll,
};
