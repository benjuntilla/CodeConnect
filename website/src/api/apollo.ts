import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

export const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: "https://hasura.io/learn/graphql",
      headers: {
        "X-Hasura-Admin-Secret":
          "f3yn9VCLzFQGEans5uex9J62HdZbArJrlzXlI5WBbmAT6IChIfAvmC3HuRu7R68x",
      },
    }),
    cache: new InMemoryCache(),
  });
};
