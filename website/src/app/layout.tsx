import type { Metadata } from "next";
import "./globals.css";
import Image from "next/image";
import LoginButton from "./components/LoginButton";
import { CgProfile } from "react-icons/cg";
import { UserProvider } from "./components/UserProvider";
import SearchBar from "./components/SearchBar";
import React from "react";
import NotificationDrawer from "./components/Notifications";
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

              <div className="navbar-start"></div>

              <SearchBar />
              <div>
                <button className="btn btn-square">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>

              <div className="navbar-end">
                <NotificationDrawer />
              </div>
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
      </UserProvider>
    </html>
  );
}
