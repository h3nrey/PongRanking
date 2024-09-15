import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
  return (
    <html lang="en">
      <body className={inter.className}>
        <div id="container" className="bg-bg h-full min-h-screen pt-8 px-10">
          <header className="flex justify-between">
            <h1 className="text-red text-[1.8rem] font-bold">Cin Pong</h1>
            <button className="bg-red rounded-lg p-2 px-4">Logar</button>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
