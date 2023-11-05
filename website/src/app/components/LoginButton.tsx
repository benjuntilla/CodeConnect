"use client";

import {
  loginGoogleFirebase,
  getFirebaseUser,
  getUserUID,
  logoutFirebase,
} from "@/lib/firebase";
import { getUser } from "@/lib/api/user";
import { useState, useEffect } from "react";
import { useUserContext } from "./UserProvider";

export default function LoginButton() {
  const [userName, setUserName] = useState("");
  const context = useUserContext();

  const updateUsername = () => {
    setUserName(getFirebaseUser()?.displayName ?? "");
  };

  useEffect(() => {
    updateUsername();
  }, []);

  return (
    <>
      {userName !== "" ? (
        <>
          <p className="mr-3">Logged in as {userName}</p>
          <button
            className="btn btn-primary"
            onClick={() => {
              console.log("Logging out...");
              logoutFirebase();
            }}
          >
            Log out
          </button>
        </>
      ) : (
        <button
          className="btn btn-primary"
          onClick={() => {
            loginGoogleFirebase(context.app).then(() => {
              getUser(context.client, getUserUID() ?? "undefined").then(
                (res) => {
                  if (res.data?.length > 0) {
                    console.log("User doesn't exist; onboarding...");
                    window.location.href = "/create_user";
                  } else {
                    console.log("User already exists; logging in...");
                    updateUsername();
                  }
                },
              );
            });
          }}
        >
          Log in
        </button>
      )}
    </>
  );
}
