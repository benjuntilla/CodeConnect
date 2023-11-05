import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import "dotenv/config";

export function initializeFirebase() {
  const app = initializeApp(
    JSON.parse(process.env.VITE_FIREBASE_CONFIG as string) as FirebaseOptions
  );

  return app;
}

export function loginGoogleFirebase(app: FirebaseApp) {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const user = signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      const user = result.user;
      return user;
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log("Auth Error Occured:", errorMessage);
      // ...
    });

  return user;
}

export function logoutFirebase() {
  const auth = getAuth();
  auth
    .signOut()
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      console.log("Logout Error Occured:", error.message);
    });
}

export function getFirebaseUser() {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    return user;
  } else {
    return null;
  }
}

export function getUserUID() {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    return user.uid;
  } else {
    return null;
  }
}
