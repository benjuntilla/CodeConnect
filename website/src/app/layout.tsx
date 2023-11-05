import type { Metadata } from "next";
import "./globals.css";
import Image from "next/image";
import LoginButton from "./components/LoginButton";
import { CgProfile } from "react-icons/cg";
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

              <div className="navbar-start"></div>

              <SearchBar />

              <div className="navbar-end">
                <button className="btn btn-ghost btn-circle">
                  <div className="indicator">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                    <span className="badge badge-xs badge-primary indicator-item"></span>
                  </div>
                </button>
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
