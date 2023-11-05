import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

export const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: import.meta.env.VITE_HASURA_ENDPOINT as string,
      headers: {
        "x-hasura-admin-secret": import.meta.env
          .VITE_HASURA_ADMIN_SECRET as string,
      },
    }),
    cache: new InMemoryCache(),
  });
};
