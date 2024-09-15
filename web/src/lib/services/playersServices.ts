import { IMatch, IPlayer } from "@/src/app/Constants/interfaces";
import { isDate } from "util/types";
import { formatDatetimeToDDMMYYY } from "@/src/utils";

const baseURL = "http://localhost:8000/";

function parsePlayer(player: any): IPlayer {
  const parsedPlayer = {
    name: player.name,
    id: player.id,
    rating: player.Rating.map((rating: { score: number; createdAt: any }) => {
      const date = rating.createdAt.slice(2, 7).replace("-", "/");
      return { score: rating.score, createdAt: date };
    }),
    ranking: player.ranking,
    grip: player.grip.title,
  };
  console.log("Parsed player");
  console.log(parsedPlayer);
  return parsedPlayer;
}

function formatGames(games: any): {
  games: { score: number; points: number[] }[];
  whosWinner: number;
} {
  let points1: number[] = [];
  let points2: number[] = [];
  let p1 = 0;
  let p2 = 0;

  games.map((game: any) => {
    let gp1 = 0;
    let gp2 = 0;

    for (let i = 0; i < game.points.length; i++) {
      const el = game.points[i];
      if (el == "0") {
        gp2 += 1;
      } else {
        gp1 += 1;
      }
    }
    points1.push(gp1);
    points2.push(gp2);
    if (gp1 > gp2) {
      p1++;
    } else {
      p2++;
    }
  });

  const gamesThing = [
    { score: p1, points: points1 },
    { score: p2, points: points2 },
  ];

  const whosWinner = p1 > p2 ? 0 : 1;
  return { games: gamesThing, whosWinner: whosWinner };
}

function parseMatch(match: any): IMatch[] {
  const gamesFormated = formatGames(match.games);

  console.log(gamesFormated);
  const formatedDate = formatDatetimeToDDMMYYY(match.startedAt);

  return {
    ...match,
    games: gamesFormated.games,
    winnerIndex: gamesFormated.whosWinner,
    startedAt: formatedDate,
  };
}

export async function getPlayerRank() {
  const res = await fetch(
    `${baseURL}players?page=0&totalRows=10&sort=rating&order=desc`
  );
  const data = await res.json();
  const players = data.map((player: any) => {
    return parsePlayer(player);
  });

  console.log(players);

  return players;
}

export async function getPlayer(id: string) {
  console.log("getting player data");
  const res = await fetch(`${baseURL}players/${id}`);
  const data = await res.json();
  console.log("Player");
  console.log(data);
  const player = parsePlayer(data);
  const matches = data.matches.map(parseMatch);
  return { player: player, matches: matches };
}
