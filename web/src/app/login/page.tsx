import Link from "next/link";
import Input from "../components/Input";

export default function Page() {
  return (
    <div className="h-full flex items-center justify-center w-full">
      <form
        action=""
        className="bg-red p-4 items-center flex flex-col gap-8 rounded-md mt-[20%]"
      >
        <h2 className="text-[2rem] font-bold">Login</h2>

        <div className="flex flex-col gap-4">
          <Input placeholder="Username" />
          <Input placeholder="Senha" />
          <button type="submit" className="bg-white text-red rounded-full py-2">
            Logar
          </button>
        </div>
        <Link href={"/register"}>Registrar-se</Link>
      </form>
    </div>
  );
}
