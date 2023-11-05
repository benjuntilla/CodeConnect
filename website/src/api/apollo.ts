import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import "dotenv/config";

export const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: process.env.VITE_HASURA_ENDPOINT as string,
      headers: {
        "x-hasura-admin-secret": process.env.VITE_HASURA_ADMIN_SECRET as string,
      },
    }),
    cache: new InMemoryCache(),
  });
};
