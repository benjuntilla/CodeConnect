"use client";

import React from "react";
import {
  loginGoogleFirebase,
  getFirebaseUser,
  getUserUID,
  logoutFirebase,
} from "@/lib/firebase";
import { getUser } from "@/lib/api/user";
import { useState, useEffect } from "react";
import { useUserContext } from "./UserProvider";
import { getAuth } from "firebase/auth";
import { CgProfile } from "react-icons/cg";
import { getNotifications } from "@/lib/api/notification";
import type { Notification } from "@/lib/types";

export default function AuthTray() {
  const context = useUserContext();
  const [user, setUser] = useState(getFirebaseUser(context.app));
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    getAuth(context.app).onAuthStateChanged((user) => {
      if (user) {
        console.log("Logged in as user UID " + getUserUID(context.app));
        setUser(user);
        getNotifications(
          context.client,
          getUserUID(context.app) ?? "undefined",
        ).then((res) => {
          let notifications = res.data.users_by_pk?.notifications;
          if (notifications !== undefined) {
            setNotifications(notifications);
          }
        });
      }
    });
  }, [context.app, context.client]);

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
                  <span className="badge badge-sm indicator-item">
                    {notifications.length}
                  </span>
                </div>
              </label>
              <div
                tabIndex={0}
                className="mt-3 z-[1] card card-compact dropdown-content w-max bg-base-100 shadow"
              >
                <div className="card-body">
                  <span className="font-bold text-lg">
                    {notifications.length} Notifications
                  </span>
                  {notifications.map((notification) => (
                    <div key={notification.id}>
                      <a href={"/profile/" + notification.user_uuid}>
                        Someone{" "}
                      </a>
                      wants to join your project!
                      <div className="card-actions">
                        <button onClick={() => {}}>Accept</button>
                        <button onClick={() => {}}>Reject</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <a href={"/profile/" + getUserUID(context.app)}>
            <CgProfile className="mx-3" size="2em" />
          </a>
        </>
      ) : (
        <button
          className="btn btn-primary"
          onClick={() => {
            loginGoogleFirebase(context.app).then(() => {
              getUser(
                context.client,
                getUserUID(context.app) ?? "undefined",
              ).then((res) => {
                console.log(res);
                if (res.data?.users_by_pk === null) {
                  console.log("User doesn't exist; onboarding...");
                  window.location.href = "/onboarding";
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
