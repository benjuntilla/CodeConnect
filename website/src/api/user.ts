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
      $id: String!
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
        profile_pfp
      }
    }
  `;
  try {
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
  } catch (e) {
    console.log(e);
  }
}

export function getUser(client: ApolloClient<any>, id: UUID) {
  const query = gql`
    query GetUser($id: String!) {
      users_by_pk(id: $id) {
        description
        id
        metadata
        name
        skills
        university
        profile_pfp
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
    mutation DeleteUser($id: String!) {
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
      $id: String = ""
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
        profile_pfp
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

export function searchUsers(
  client: ApolloClient<any>,
  name: string,
  skills: string,
  page_num: number,
  page_size: number,
) {
  const query = gql`
    query SearchUsers(
      $name: String!
      $skills: String = ""
      $page_num: Int!
      $page_size: Int!
    ) {
      search_users(
        args: {
          search: $name
          skills_filter: $skills
          page_num: $page_num
          page_size: $page_size
        }
      ) {
        description
        id
        metadata
        name
        skills
        university
        profile_pfp
      }
    }
  `;

  return client.query({
    query,
    variables: {
      name,
      skills,
      page_num,
      page_size,
    },
  });
}
