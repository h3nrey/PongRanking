export interface IPlayer {
  id: string;
  name: string;
  rating: { score: number; createdAt: string }[];
  ranking: string;
  grip: string;
}

export interface IMatch {
  winnerId: string;
  players: IPlayer[];
  type: string;
  startedAt: string;
  games: { score: number; points: number[] }[];
  winnerIndex: number;
  maxPoints: number;
}
