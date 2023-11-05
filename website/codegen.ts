import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: {
    "https://quality-oyster-64.hasura.app/v1/graphql": {
      headers: {
        "X-Hasura-Admin-Secret":
          "JKLRAD7Ro8vaY1Yd7TXOAvpq55FRQon5f8FQRkBuhWSE1KVADSbqjgihNfq6SZcd",
      },
    },
  },

  // this assumes that all your source files are in a top-level `src/` directory - you might need to adjust this to your file structure
  documents: ["src/**/*.{ts,tsx}"],
  generates: {
    "./src/__generated__/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
