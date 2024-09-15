"use client";
import { useEffect, useState } from "react";
import { IPlayer } from "../Constants/interfaces";
import { getPlayerRank } from "@/src/lib/services/playersServices";
import Link from "next/link";

export default function Ranking() {
  const [players, setPlayers] = useState<IPlayer[]>([]);

  useEffect(() => {
    getThing();
    async function getThing() {
      const playersT = await getPlayerRank();
      setPlayers(playersT);
      console.log(playersT);
    }
  }, []);

  return (
    <div className="mt-8">
      <h1 className="text-[2rem] font-semibold">Ranking</h1>

      <div className="mt-8">
        <header className="flex justify-between">
          <div className="flex gap-4">
            <span>Classificação</span>
            <span>Nome</span>
          </div>

          <div id="order__type_wrapper" className="flex gap-4">
            <button className="hover:bg-red px-2 rounded-md">Single</button>
            <button>Dupla</button>
            <button>Volei</button>
          </div>
        </header>

        <div className="flex flex-col gap-4 mt-4">
          {players.map((player, i) => (
            <Link
              href={`/players/${player.id}`}
              key={i}
              className="flex p-4 py-2 bg-lightgray rounded-md justify-between hover:outline-4 hover:outline-red cursor-pointer hover:outline"
            >
              <div className="flex">
                <div className="min-w-[6.25rem]">{i + 1}</div>
                <div>{player.name}</div>
              </div>
              <div>
                <span>{player.rating[0].score}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
