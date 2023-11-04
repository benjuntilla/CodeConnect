import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

export const createApolloClient = (user_id: string) => {
  return new ApolloClient({
    link: new HttpLink({
      uri: "https://hasura.io/learn/graphql",
      headers: {
        "X-Hasura-User-Id": user_id,
        "X-Hasura-Role": "user",
      },
    }),
    cache: new InMemoryCache(),
  });
};
