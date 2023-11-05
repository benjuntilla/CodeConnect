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
import { CgProfile } from "react-icons/cg";

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
      {user ? (
        <>
          <p className="mr-3">Logged in as {user?.displayName}</p>
          <button
            className="btn btn-primary"
            onClick={() => {
              console.log("Logging out...");
              logoutFirebase(context.app);
              window.location.reload();
            }}
          >
            Log out
          </button>
  <div className="flex-none">
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        <div className="indicator">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
          <span className="badge badge-sm indicator-item">8</span>
        </div>
      </label>
      <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
        <div className="card-body">
          <span className="font-bold text-lg">8 Items</span>
          <span className="text-info">Subtotal: $999</span>
          <div className="card-actions">
            <button className="btn btn-primary btn-block">View cart</button>
          </div>
        </div>
      </div>
    </div>
          </div>
          <a href="/profile">
            <CgProfile className="mx-3" size="2em" />
          </a>
        </>
      ) : (
        <button
          className="btn btn-primary"
          onClick={() => {
            loginGoogleFirebase(firebase).then(() => {
              console.log(getUserUID(context.app) ?? "undefined");
              getUser(
                apolloClient,
                getUserUID(context.app) ?? "undefined",
              ).then((res) => {
                if (res.data?.length > 0) {
                  console.log("User doesn't exist; onboarding...");
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
