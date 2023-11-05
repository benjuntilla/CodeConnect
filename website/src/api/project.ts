import { ApolloClient, ApolloQueryResult, gql } from "@apollo/client";
import { Project } from "./types";

export async function createProject(
  client: ApolloClient<any>,
  project: Project,
) {
  const mutation = gql`
    mutation CreateProject(
      $name: String!
      $description: String!
      $skills_required: String = ""
      $metadata: jsonb = ""
      $created_user: String!
    ) {
      insert_projects_one(
        object: {
          name: $name
          description: $description
          skills_required: $skills_required
          metadata: $metadata
          created_user: $created_user
        }
      ) {
        id
        name
        description
        metadata
        skills_required
        created_user
      }
    }
  `;

  let data = await client.mutate({
    mutation,
    variables: {
      name: project.name,
      description: project.description,
      skills_required: project.skills_required,
      metadata: project.metadata,
      created_user: project.created_user,
    },
  });

  const project_mutation = gql`
    mutation CreateProjectAssignment(
      $user_uuid: String!
      $project_uuid: uuid!
    ) {
      insert_project_assignments_one(
        object: { user_uuid: $user_uuid, project_uuid: $project_uuid }
      ) {
        user_uuid
        project_uuid
      }
    }
  `;
  client.mutate({
    mutation: project_mutation,
    variables: {
      user_uuid: project.created_user,
      project_uuid: data.data.insert_projects_one.id,
    },
  });

  return data;
}

export function getProject(client: ApolloClient<any>, id: string) {
  const query = gql`
    query GetProject($id: uuid!) {
      projects_by_pk(id: $id) {
        id
        name
        description
        metadata
        skills_required
        created_user
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

export function updateProject(client: ApolloClient<any>, project: Project) {
  const mutation = gql`
    mutation UpdateProject(
      $id: uuid!
      $name: String!
      $description: String!
      $skills_required: String = ""
      $metadata: jsonb = ""
      $created_user: String!
    ) {
      update_projects_by_pk(
        pk_columns: { id: $id }
        _set: {
          name: $name
          description: $description
          skills_required: $skills_required
          metadata: $metadata
          created_user: $created_user
        }
      ) {
        id
        name
        description
        metadata
        skills_required
        created_user
      }
    }
  `;

  return client.mutate({
    mutation,
    variables: {
      id: project.id,
      name: project.name,
      description: project.description,
      skills_required: project.skills_required,
      metadata: project.metadata,
      created_user: project.created_user,
    },
  });
}

export function deleteProject(client: ApolloClient<any>, id: string) {
  const mutation = gql`
    mutation DeleteProject($id: uuid!) {
      delete_projects_by_pk(id: $id) {
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

export function recommendProjects(
  client: ApolloClient<any>,
  user_id: string,
  page_size: number,
  page_number: number,
) {
  const query = gql`
    query RecommendProjects(
      $user_id: String!
      $page_size: Int!
      $page_number: Int!
    ) {
      recommend_projects(
        args: {
          user_id: $user_id
          page_num: $page_number
          page_size: $page_size
        }
      ) {
        id
        name
        description
        metadata
        skills_required
        created_user
      }
    }
  `;

  return client.query({
    query,
    variables: {
      user_id,
      page_size,
      page_number,
    },
  });
}

export function searchProjects(
  client: ApolloClient<any>,
  search: string,
  skills: string,
  page_size: number,
  page_number: number,
) {
  const query = gql`
    query SearchProjects(
      $search: String!
      $skills: String = ""
      $page_size: Int!
      $page_number: Int!
    ) {
      search_projects(
        args: {
          search: $search
          skills_filter: $skills
          page_num: $page_number
          page_size: $page_size
        }
      ) {
        id
        name
        description
        metadata
        skills_required
        created_user
      }
    }
  `;

  return client.query({
    query,
    variables: {
      search,
      skills,
      page_size,
      page_number,
    },
  });
}

//get projects by user
export function getProjectsByUser(
  client: ApolloClient<any>,
  user_id: string,
  page_size: number,
  page_number: number,
) {
  const query = gql`
    query GetProjectsByUser(
      $user_id: String!
      $page_size: Int!
      $page_number: Int!
    ) {
      project_assignments(where: { user_uuid: { _eq: $user_id } }) {
        project {
          id
          name
          description
          metadata
          skills_required
          created_user
        }
      }
    }
  `;

  return client.query({
    query,
    variables: {
      user_id,
      page_size,
      page_number,
    },
  });
}
