import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

export const createUserApolloClient = (user_id: string) => {
  return new ApolloClient({
    link: new HttpLink({
      uri: "https://quality-oyster-64.hasura.app/v1/graphql",
      headers: {
        "x-hasura-user-role": "user",
        "x-hasura-user-id": user_id,
      },
    }),
    cache: new InMemoryCache(),
  });
};
