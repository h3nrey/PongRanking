import axios, { AxiosError } from "axios";
import api from "./api";

const baseURL = "http://localhost:8000/";

// export async function loginUser(loginData: FormData) {
//   const res = await fetch(`${baseURL}users/login`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: loginData,
//   });
//   const data = await res.json();
//   return data;
// }

export async function loginUser(loginData: any) {
  try {
    const res = await api.post(`users/login`, {
      username: loginData.get("username"),
      password: loginData.get("password"),
    });
    const data = await res.data;
    return {
      message: "",
      data: data.data,
    };
  } catch (err) {
    const error = err as Error | AxiosError;
    if (!axios.isAxiosError(error)) {
      return;
    }

    if (error.response?.status == 401) {
      console.log("Invalid");
      return {
        message: "Credenciais inválidas",
        data: null,
      };
    } else if (error.response?.status == 404) {
      console.log("Invalid credentials");
      return {
        message: "Usuário não encontrado",
        data: null,
      };
    }
  }
}

export async function registerUser(registerData: any) {
  try {
    const res = await api.post(`users/register`, {
      username: registerData.get("username"),
      email: registerData.get("email"),
      password: registerData.get("password"),
    });
    const data = await res.data;
    return {
      message: "",
      data: data.data,
    };
  } catch (err) {
    const error = err as Error | AxiosError;
    if (!axios.isAxiosError(error)) {
      return;
    }

    if (error.response?.status == 409) {
      return {
        message: "Usuário já existe",
        data: null,
      };
    }
  }
}
