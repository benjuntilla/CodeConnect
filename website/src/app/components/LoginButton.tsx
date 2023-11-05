"use client";

import { initializeFirebase, loginGoogleFirebase } from "@/lib/firebase";

export default function LoginButton() {
  return (
    <button
      className="btn btn-primary"
      onClick={() => {
        let app = initializeFirebase();
        Promise.resolve(loginGoogleFirebase(app));
      }}
    >
      Log in
    </button>
  );
}
