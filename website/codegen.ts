import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: {
    "https://tough-slug-93.hasura.app/v1/graphql": {
      headers: {
        "X-Hasura-Admin-Secret":
          "f3yn9VCLzFQGEans5uex9J62HdZbArJrlzXlI5WBbmAT6IChIfAvmC3HuRu7R68x",
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
