"use client";
import Link from "next/link";
import Input from "../components/Input";
import { useEffect, useState } from "react";
import { loginUser } from "@/src/lib/services/usersServices";
import { redirect, useRouter } from "next/navigation";
import { getCookie, setCookie } from "cookies-next";
import api from "@/src/lib/services/api";
import { cookies } from "next/headers";
import UserForm from "../components/Login/UserForm";

export default function Page() {
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState("Usuário não encontrado");

  useEffect(() => {
    if (getCookie("user")) {
      router.replace("/");
    }
  });
  async function handleLogin(e: any) {
    e.preventDefault();
    const formData = new FormData(e.target);

    // Validate fields
    const username = formData.get("username");
    const password = formData.get("password");

    if (username == "" || password == "") {
      enableLoginAlert("Required fields are missing");
      return;
    }

    const userData = await loginUser(formData);

    if (!userData) return;

    if (!userData.data) {
      enableLoginAlert(userData.message);
      return;
    }

    if (userData.data.token) {
      const expireDate = 14 * 24 * 60 * 60;
      setCookie("user", userData.data, { maxAge: expireDate });
      // router.push("/");
      router.refresh();
    }
  }

  function enableLoginAlert(message: string) {
    setShowAlert(true);
    setAlertText(message);
    setTimeout(() => setShowAlert(false), 2000);
  }

  return (
    <UserForm
      formAction={handleLogin}
      title="Login"
      submitText="Logar"
      showAlert={showAlert}
      alertText={alertText}
      otherPageLink="/register"
      otherPageText="Fazer cadastro"
    >
      <>
        <Input placeholder="Username" name="username" />
        <Input placeholder="Senha" name="password" type="password" />
      </>
    </UserForm>
    // <div className="h-full flex-1 flex items-center justify-center w-full">
    //   <div className="flex flex-col relative">
    //     <div
    //       id="login__alert__toast"
    //       className="bg-lightgray rounded p-2 absolute -top-2 w-full transition"
    //       style={{
    //         transform: showAlert
    //           ? "translate(0%, -100%)"
    //           : "translate(-50%, -100%)",
    //         opacity: showAlert ? "1" : "0",
    //       }}
    //     >
    //       {alertText}
    //     </div>
    //     <form
    //       onSubmit={handleLogin}
    //       className="bg-red p-4 items-center flex flex-col gap-8 rounded-md"
    //     >
    //       <h2 className="text-[2rem] font-bold">Login</h2>

    //       <div className="flex flex-col gap-4">
    //         <Input placeholder="Username" name="username" />
    //         <Input placeholder="Senha" name="password" type="password" />
    //         <button
    //           type="submit"
    //           className="bg-white text-red rounded-full py-2"
    //         >
    //           Logar
    //         </button>
    //       </div>
    //       <Link href={"/register"}>Registrar-se</Link>
    //     </form>
    //   </div>
    // </div>
  );
}
