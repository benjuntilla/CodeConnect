"use client";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { User, getAuth } from "firebase/auth";
import { FirebaseApp } from "firebase/app";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { initializeFirebase } from "@/lib/firebase";
import { createApolloClient } from "@/lib/apollo";

interface UserContextProps {
  user?: User;
  setUser: Dispatch<SetStateAction<User>>;
  app: FirebaseApp;
  client: ApolloClient<NormalizedCacheObject>;
}

const UserContext = createContext<UserContextProps>(undefined!);
export function UserProvider({ children }: any) {
  const [app, setApp] = useState(initializeFirebase());
  const [currentUser, setUser] = useState<User>(
    getAuth().currentUser ?? undefined!
  );
  const [client, setClient] = useState(createApolloClient());
  // call your backend api to fetch the user or anything they needs global access
  return (
    <UserContext.Provider
      value={{
        user: currentUser,
        setUser,
        app,
        client,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext(): UserContextProps {
  const context = useContext(UserContext);

  if (typeof context === "undefined") {
    throw new Error(
      "useUserContext should be used within the UserContext provider!"
    );
  }

  return context;
}
