"use client";

import { createApolloClient } from "@/lib/apollo";
import {
  loginGoogleFirebase,
  getFirebaseUser,
  getUserUID,
  logoutFirebase,
  initializeFirebase,
} from "@/lib/firebase";
import { getUser } from "@/lib/api/user";
import { useState, useEffect } from "react";
import { useUserContext } from "./UserProvider";
import { getAuth } from "firebase/auth";

export default function LoginButton() {
  const context = useUserContext();
  const [user, setUser] = useState(getFirebaseUser(context.app));
  const [firebase] = useState(initializeFirebase());
  const [apolloClient] = useState(createApolloClient());

  useEffect(() => {
    getAuth(context.app).onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);

  return (
    <>
      {user?.displayName !== "" ? (
        <>
          <p className="mr-3">Logged in as {user?.displayName}</p>
          <button
            className="btn btn-primary"
            onClick={() => {
              console.log("Logging out...");
              logoutFirebase(context.app);
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
              getUser(
                apolloClient,
                getUserUID(context.app) ?? "undefined"
              ).then((res) => {
                if (res.data?.length > 0) {
                  console.log("User doesn't exist; onboarding...");
                  window.location.href = "/create_user";
                } else {
                  console.log("User already exists; logging in...");
                  setUser(getFirebaseUser(context.app));
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
