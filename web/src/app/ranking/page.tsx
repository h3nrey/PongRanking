"use client";
import { useEffect, useState } from "react";
import { IPlayer } from "../Constants/interfaces";
import {
  getPlayerRank,
  getTotalOfPlayers,
} from "@/src/lib/services/playersServices";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Ranking() {
  const [players, setPlayers] = useState<IPlayer[]>([]);
  const [totalPages, setTotalPages] = useState(10);
  const [currPage, setCurrPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  function changeCurrPage(page: number) {
    setCurrPage(page);
    setIsLoading(true);
  }

  useEffect(() => {
    setIsLoading(true);
    const paramsPage = searchParams.get("currPage");
    let page = paramsPage ?? "1";
    console.log(page);

    setCurrPage(parseInt(page));
    getTotal();
    async function getTotal() {
      const total = await getTotalOfPlayers();
      const pages = Math.ceil(total / 10);
      console.log(pages);
      setTotalPages(pages);
    }
    getThing();
    async function getThing() {
      const playersT = await getPlayerRank(page);
      setPlayers(playersT);
      setTimeout(() => setIsLoading(false), 250);
    }
  }, [searchParams]);

  return (
    <div className="mt-8 pb-8">
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

        {isLoading ? (
          <div className="py-8">Loading ...</div>
        ) : (
          <>
            <div className="flex flex-col gap-4 mt-4">
              {isLoading ? (
                <div>Loading ...</div>
              ) : (
                <>
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
                </>
              )}
            </div>

            <div className="flex gap-2 mt-4 items-center">
              <button className="px-2 bg-lightgray rounded-sm h-full py-1">
                &lt;
              </button>
              <div className="flex gap-2">
                {Array(totalPages)
                  .fill(1)
                  .map((page, i) => (
                    <Link
                      key={i}
                      className="outline-1 outline outline-lightgray text-lightgray rounded-sm px-0 text-[0.8] font-light min-w-9 py-0 hover:scale-105"
                      href={`/ranking?currPage=${i + 1}`}
                      style={{
                        background: i + 1 == currPage ? "red" : "transparent",
                        color: i + 1 == currPage ? "white" : "#505050",
                        outline: i + 1 == currPage ? "none" : "solid",
                      }}
                    >
                      {i + 1}
                    </Link>
                  ))}
              </div>
              <button className="px-2 bg-lightgray rounded-sm h-full py-1">
                &gt;
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
