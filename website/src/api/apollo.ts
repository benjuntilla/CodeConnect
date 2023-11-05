import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

export const createAdminApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: process.env.VITE_HASURA_DB_URL,
      headers: {
        "x-hasura-admin-secret": process.env.VITE_HASURA_CLIENT_SECRET!,
      },
    }),
    cache: new InMemoryCache(),
  });
};

export const createUserApolloClient = (user_id: string) => {
  return new ApolloClient({
    link: new HttpLink({
      uri: process.env.VITE_HASURA_DB_URL,
      headers: {
        "x-hasura-user-role": "user",
        "x-hasura-user-id": user_id,
      },
    }),
    cache: new InMemoryCache(),
  });
};
