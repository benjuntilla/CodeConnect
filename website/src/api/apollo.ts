import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

export const createApolloClient = (user_id: string) => {
  return new ApolloClient({
    link: new HttpLink({
      uri: "https://quality-oyster-64.hasura.app/v1/graphql",
      headers: {
        "x-hasura-admin-secret":
          "JKLRAD7Ro8vaY1Yd7TXOAvpq55FRQon5f8FQRkBuhWSE1KVADSbqjgihNfq6SZcd",
      },
    }),
    cache: new InMemoryCache(),
  });
};
