export default function Page() {
  return (
    <div className="h-full flex items-center justify-center w-full">
      <form
        action=""
        className="bg-red p-4 items-center flex flex-col gap-8 rounded-md mt-[20%]"
      >
        <h2>Cadastro</h2>

        <div className="flex flex-col">
          <input
            type="text"
            placeholder="username"
            className="bg-bg rounded-full p-4"
          />
          <input type="text" placeholder="email" />
          <input type="password" placeholder="Senha" />
          <button type="submit">Cadastrar</button>
        </div>
      </form>
    </div>
  );
}
