import type { Metadata } from "next";
import "./globals.css";
import Image from "next/image";
import LoginButton from "./components/LoginButton";
import { UserProvider } from "./components/UserProvider";
import SearchBar from "./components/SearchBar";
import React from "react";
export const useClient = true;
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
      <UserProvider>
        <body>
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
                <h1>Code Cupid</h1>
              </a>
              {/* <div className="navbar-start"></div>
              <SearchBar />
              <div className="navbar-end"></div> */}
            </div>
            <div className="flex-none">
              <LoginButton />
            </div>
          </div>
          <div className="flex justify-center">{children}</div>
        </body>
      </UserProvider>
    </html>
  );
}
