import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./component/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IRC Project",
  description: "An project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="flex flex-col items-center h-auto" style={{backgroundColor: "#fafafa", color:"#4287f5"}} >
        <header className="w-full text-center">
          <Navbar/>
          <h1 style={{fontSize: "8vh"}}>IRC Project</h1>
        </header>
        {children}
        <footer>

        </footer>
      </body>
    </html>
  );
}
