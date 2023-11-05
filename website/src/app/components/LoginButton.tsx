"use client";

import { createApolloClient } from "@/api/apollo";
import {
  initializeFirebase,
  loginGoogleFirebase,
  getFirebaseUser,
  getUserUID,
  logoutFirebase,
} from "@/api/firebase";
import { getUser } from "@/api/user";
import { useState, useEffect } from "react";

export default function LoginButton() {
  const [userName, setUserName] = useState("");
  const [firebase] = useState(initializeFirebase());
  const [apolloClient] = useState(createApolloClient());

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
            loginGoogleFirebase(firebase).then(() => {
              getUser(apolloClient, getUserUID() ?? "undefined").then((res) => {
                if (res.data?.length > 0) {
                  console.log("User doesn't exist; onboarding...");
                  window.location.href = "/create_user";
                } else {
                  console.log("User already exists; logging in...");
                  updateUsername();
                }
              });
            });
          }}
        >
          Log in
        </button>
      )}
    </>
  );
}
