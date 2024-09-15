"use client";

import { getPlayer } from "@/src/lib/services/playersServices";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IMatch, IPlayer } from "../../Constants/interfaces";
import Image from "next/image";
import Stack from "@mui/material/Stack";
import { LineChart } from "@mui/x-charts/LineChart";

export default function Page() {
  const params = useParams<{ id: string }>();

  const [player, setPlayer] = useState<IPlayer | null>(null);
  const [matches, setMatches] = useState<IMatch[]>([]);
  const data = [4000, 3000, 2000, 1500, 1890];
  const xData = ["24/05", "24/06", "24/07", "24/08", "24/08"];
  console.log(params.id);

  useEffect(() => {
    const getData = async () => {
      if (params.id) {
        const playerData = await getPlayer(params.id);
        console.log(playerData);

        if (playerData.player.name) {
          setPlayer(playerData.player);
        }
        setMatches(playerData.matches);
      }
    };

    getData();
  }, []);
  return (
    <div className="flex mt-10 gap-4 pb-10">
      <Image
        src={
          "https://www.butterfly-global.com/en/sponsoring/item/fan-zhendong.jpg"
        }
        className="rounded-lg object-cover h-64"
        alt={"player image"}
        width={300}
        height={300}
      />
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-6">
          <h1 className="text-[2rem]">{player?.name}</h1>
          <div className="flex gap-2">
            <span>Pegada</span>
            <span className="bg-red p-2 rounded-lg">{player?.grip}</span>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-end">
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-[1.5rem]">Solo</h3>
              <p className="text-[2rem] font-bold">
                {" "}
                {player?.rating[0].score}
              </p>
            </div>
            <div>
              Ranking{" "}
              <span className="bg-red p-1 rounded-sm"># {player?.ranking}</span>
            </div>
          </div>
          {player && player.rating.length > 0 && (
            <Stack sx={{ width: "100%" }}>
              <LineChart
                className="font-bold text-white"
                xAxis={[
                  {
                    data: xData,
                    scaleType: "point",
                  },
                ]}
                series={[
                  {
                    data: player.rating.map((r) => r.score).toReversed(),
                    area: true,
                    color: "#FF0B0B",
                  },
                ]}
                height={200}
                width={600}
                margin={{ top: 10, bottom: 20 }}
              />
            </Stack>
          )}
        </div>

        {/* Histórico de Partida  */}
        <div className="flex flex-col gap-6">
          <h3 className="font-semibold text-[1.5rem]">Histórico de Partida</h3>
          <div className="flex flex-col gap-2">
            {matches.map((match, i) => (
              <div
                key={i}
                className="bg-lightgray rounded-md p-2 flex justify-between items-center"
              >
                <div>
                  {match.players.map((p, i) => (
                    <div key={i}>{p.name}</div>
                  ))}
                </div>
                <div>
                  {match.games.map((p, i) => (
                    <div key={i} className="flex text-[0.8rem] items-center">
                      <span
                        className="font-bold text-[1.2rem] mr-2 w-[1rem]"
                        style={{
                          color: i == match.winnerIndex ? "red" : "white",
                        }}
                      >
                        {p.score}
                      </span>
                      <div className="flex gap-1">
                        {p.points.map((point, i) => (
                          <span key={i} className="w-4 text-center">
                            {point}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div>{match.startedAt}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}
