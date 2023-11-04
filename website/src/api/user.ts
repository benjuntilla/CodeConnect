import { ApolloClient, ApolloQueryResult, gql } from "@apollo/client";
import { User } from "./types";
import { UUID } from "crypto";

export function createUser(client: ApolloClient<any>, user: User) {
  const mutation = gql`
    mutation CreateUser(
      $description: String = ""
      $metadata: jsonb = ""
      $name: String!
      $skills: String = ""
      $id: uuid!
      $university: String = ""
    ) {
      insert_users_one(
        object: {
          description: $description
          metadata: $metadata
          name: $name
          skills: $skills
          id: $id
          university: $university
        }
      ) {
        description
        id
        metadata
        name
        skills
        university
      }
    }
  `;

  return client.mutate({
    mutation,
    variables: {
      id: user.id,
      name: user.name,
      description: user.description,
      university: user.description,
      skills: user.skills,
      metadata: user.metadata,
    },
  });
}

export function getUser(client: ApolloClient<any>, id: UUID) {
  const query = gql`
    query GetUser($id: uuid!) {
      users_by_pk(id: $id) {
        description
        id
        metadata
        name
        skills
        university
      }
    }
  `;

  return client.query({
    query,
    variables: {
      id,
    },
  });
}

export function deleteUser(client: ApolloClient<any>, id: UUID) {
  const mutation = gql`
    mutation DeleteUser($id: uuid!) {
      delete_users_by_pk(id: $id) {
        id
      }
    }
  `;

  return client.mutate({
    mutation,
    variables: {
      id,
    },
  });
}

export function updateUser(client: ApolloClient<any>, user: User) {
  const mutation = gql`
    mutation UpdateUser(
      $description: String = ""
      $metadata: jsonb = ""
      $name: String = ""
      $skills: String = ""
      $id: uuid = ""
      $university: String = ""
    ) {
      update_users_by_pk(
        pk_columns: { id: $id }
        _set: {
          description: $description
          metadata: $metadata
          name: $name
          skills: $skills
          university: $university
        }
      ) {
        description
        id
        metadata
        name
        skills
        university
      }
    }
  `;

  return client.mutate({
    mutation,
    variables: {
      id: user.id,
      name: user.name,
      description: user.description,
      university: user.description,
      skills: user.skills,
      metadata: user.metadata,
    },
  });
}
