import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cookies } from "next/headers";
import Link from "next/link";
import UserOverlay from "./components/Header/UserOverlay";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cin Pong",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const storer = cookies();
  const userCookies = storer.get("user");
  const userToken: { id: string; username: string; token: string } = userCookies
    ? JSON.parse(userCookies.value)
    : null;

  return (
    <html lang="en">
      <body className={inter.className}>
        <div
          id="container"
          className="bg-bg h-full flex flex-col min-h-screen pt-8 px-10"
        >
          <header className="flex justify-between">
            <h1 className="text-red text-[1.8rem] font-bold">Cin Pong</h1>

            {userToken ? (
              <div className="flex flex-col items-end relative group">
                <h1 className="text-[1.5rem] text-lightgray font-semibold cursor-pointer">
                  {userToken.username}
                </h1>
                <UserOverlay />
              </div>
            ) : (
              <Link className="bg-red rounded-lg p-2 px-4" href={"/login"}>
                Logar
              </Link>
            )}
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
