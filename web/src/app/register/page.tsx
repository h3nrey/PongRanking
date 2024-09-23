"use client";
import { registerUser } from "@/src/lib/services/usersServices";
import UserForm from "../components/Login/UserForm";
import { setCookie } from "cookies-next";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import Input from "../components/Input";

export default function Page() {
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState("Usuário não encontrado");

  async function handleRegister(e: any) {
    e.preventDefault();
    const formData = new FormData(e.target);

    // Validate fields
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("password2");

    if (
      username == "" ||
      password == "" ||
      email == "" ||
      confirmPassword == ""
    ) {
      handleFormAlert("Required fields are missing");
      return;
    }

    if (password != confirmPassword) {
      handleFormAlert("As senhas não coincidem");
      return;
    }

    console.log("Cadastrando");

    const userData = await registerUser(formData);

    if (!userData) return;

    if (!userData.data) {
      handleFormAlert(userData.message);
      return;
    }

    console.log(userData.data);

    if (userData.data.token) {
      const expireDate = 14 * 24 * 60 * 60;
      setCookie("user", userData.data, { maxAge: expireDate });
      router.refresh();
      router.replace("/");
    }
  }

  function handleFormAlert(message: string) {
    setShowAlert(true);
    setAlertText(message);
    setTimeout(() => setShowAlert(false), 2000);
  }

  function refreshThing() {}
  return (
    <UserForm
      formAction={handleRegister}
      title="Cadastro"
      submitText="Registrar"
      showAlert={showAlert}
      alertText={alertText}
      otherPageLink="/login"
      otherPageText="Fazer login"
    >
      <>
        <Input placeholder="Username" name="username" />
        <Input placeholder="Email" name="email" type="text" />
        <Input placeholder="Senha" name="password" type="password" />
        <Input placeholder="Confirmar senha" name="password2" type="password" />
      </>
    </UserForm>
  );
}
