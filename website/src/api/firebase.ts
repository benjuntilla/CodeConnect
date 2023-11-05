import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import "dotenv/config";

export function initializeFirebase() {
  const app = initializeApp({
    apiKey: "AIzaSyAK9iwn3uVMUIgR8jFwCKar3jaWv6TMQD4",
    authDomain: "codecupid-8ff03.firebaseapp.com",
    projectId: "codecupid-8ff03",
    storageBucket: "codecupid-8ff03.appspot.com",
    messagingSenderId: "650497263710",
    appId: "1:650497263710:web:31329fcad44deb16a70ccf",
  });

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
