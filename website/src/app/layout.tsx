import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import LoginButton from "./components/LoginButton";
import { CgProfile } from "react-icons/cg";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Code Cupid",
  description: "Match with coders who love what you love",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <div className="navbar bg-primary">
          <div className="flex-1">
            <a href="/">
              <Image
                src="/CodeCupid-.png"
                width={100}
                height={100}
                alt="Code Cupid icon"
              />
            </a>
            <a href="/">
              <h1 className="text-lg">Code Cupid</h1>
            </a>
          </div>
          <div className="flex-none">
            <LoginButton />
            <a href="/profile">
              <CgProfile className="mx-3" size="2em" />
            </a>
          </div>
        </div>
        <div className="flex justify-center">{children}</div>
      </body>
    </html>
  );
}
