"use client";

import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function UserOverlay() {
  const router = useRouter();
  function handleLogout() {
    deleteCookie("user");
    router.refresh();
  }
  return (
    <div className="group-hover:flex hidden flex-col items-end bg-red text-lightgray text-right rounded-md p-2 absolute top-10 right-0">
      <div className="hover:bg-bg rounded-md px-2 py-1 hover:text-red font-semibold w-max cursor-pointer min-w-full">
        Criar jogador
      </div>
      <div className="hover:bg-bg rounded-md px-2 py-1 hover:text-red font-semibold w-max cursor-pointer">
        Atualilzar usuário
      </div>
      <button
        onClick={handleLogout}
        className="hover:bg-bg rounded-md px-2 py-1 hover:text-red font-semibold w-max cursor-pointer min-w-full"
      >
        Deslogar
      </button>
    </div>
  );
}
