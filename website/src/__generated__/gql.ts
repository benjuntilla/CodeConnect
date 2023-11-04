/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n    mutation CreateProject(\n      $name: String!\n      $description: String!\n      $skills_required: String = \"\"\n      $metadata: jsonb = \"\"\n      $created_user: uuid!\n    ) {\n      insert_projects_one(\n        object: {\n          name: $name\n          description: $description\n          skills_required: $skills_required\n          metadata: $metadata\n          created_user: $created_user\n        }\n      ) {\n        id\n        name\n        description\n        metadata\n        skills_required\n        created_user\n      }\n    }\n  ": types.CreateProjectDocument,
    "\n    query GetProject($id: uuid!) {\n      projects_by_pk(id: $id) {\n        id\n        name\n        description\n        metadata\n        skills_required\n        created_user\n      }\n    }\n  ": types.GetProjectDocument,
    "\n    mutation UpdateProject(\n      $id: uuid!\n      $name: String!\n      $description: String!\n      $skills_required: String = \"\"\n      $metadata: jsonb = \"\"\n      $created_user: uuid!\n    ) {\n      update_projects_by_pk(\n        pk_columns: { id: $id }\n        _set: {\n          name: $name\n          description: $description\n          skills_required: $skills_required\n          metadata: $metadata\n          created_user: $created_user\n        }\n      ) {\n        id\n        name\n        description\n        metadata\n        skills_required\n        created_user\n      }\n    }\n  ": types.UpdateProjectDocument,
    "\n    mutation DeleteProject($id: uuid!) {\n      delete_projects_by_pk(id: $id) {\n        id\n      }\n    }\n  ": types.DeleteProjectDocument,
    "\n    query RecommendProjects(\n      $user_id: uuid!\n      $page_size: Int!\n      $page_number: Int!\n    ) {\n      recommend_projects(\n        args: {\n          user_id: $user_id\n          page_num: $page_number\n          page_size: $page_size\n        }\n      ) {\n        id\n        name\n        description\n        metadata\n        skills_required\n        created_user\n      }\n    }\n  ": types.RecommendProjectsDocument,
    "\n    query SearchProjects(\n      $search: String!\n      $skills: String = \"\"\n      $page_size: Int!\n      $page_number: Int!\n    ) {\n      search_projects(\n        args: {\n          search: $search\n          skills_filter: $skills\n          page_num: $page_number\n          page_size: $page_size\n        }\n      ) {\n        id\n        name\n        description\n        metadata\n        skills_required\n        created_user\n      }\n    }\n  ": types.SearchProjectsDocument,
    "\n    mutation CreateUser(\n      $description: String = \"\"\n      $metadata: jsonb = \"\"\n      $name: String!\n      $skills: String = \"\"\n      $id: uuid!\n      $university: String = \"\"\n    ) {\n      insert_users_one(\n        object: {\n          description: $description\n          metadata: $metadata\n          name: $name\n          skills: $skills\n          id: $id\n          university: $university\n        }\n      ) {\n        description\n        id\n        metadata\n        name\n        skills\n        university\n      }\n    }\n  ": types.CreateUserDocument,
    "\n    query GetUser($id: uuid!) {\n      users_by_pk(id: $id) {\n        description\n        id\n        metadata\n        name\n        skills\n        university\n      }\n    }\n  ": types.GetUserDocument,
    "\n    mutation DeleteUser($id: uuid!) {\n      delete_users_by_pk(id: $id) {\n        id\n      }\n    }\n  ": types.DeleteUserDocument,
    "\n    mutation UpdateUser(\n      $description: String = \"\"\n      $metadata: jsonb = \"\"\n      $name: String = \"\"\n      $skills: String = \"\"\n      $id: uuid = \"\"\n      $university: String = \"\"\n    ) {\n      update_users_by_pk(\n        pk_columns: { id: $id }\n        _set: {\n          description: $description\n          metadata: $metadata\n          name: $name\n          skills: $skills\n          university: $university\n        }\n      ) {\n        description\n        id\n        metadata\n        name\n        skills\n        university\n      }\n    }\n  ": types.UpdateUserDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation CreateProject(\n      $name: String!\n      $description: String!\n      $skills_required: String = \"\"\n      $metadata: jsonb = \"\"\n      $created_user: uuid!\n    ) {\n      insert_projects_one(\n        object: {\n          name: $name\n          description: $description\n          skills_required: $skills_required\n          metadata: $metadata\n          created_user: $created_user\n        }\n      ) {\n        id\n        name\n        description\n        metadata\n        skills_required\n        created_user\n      }\n    }\n  "): (typeof documents)["\n    mutation CreateProject(\n      $name: String!\n      $description: String!\n      $skills_required: String = \"\"\n      $metadata: jsonb = \"\"\n      $created_user: uuid!\n    ) {\n      insert_projects_one(\n        object: {\n          name: $name\n          description: $description\n          skills_required: $skills_required\n          metadata: $metadata\n          created_user: $created_user\n        }\n      ) {\n        id\n        name\n        description\n        metadata\n        skills_required\n        created_user\n      }\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetProject($id: uuid!) {\n      projects_by_pk(id: $id) {\n        id\n        name\n        description\n        metadata\n        skills_required\n        created_user\n      }\n    }\n  "): (typeof documents)["\n    query GetProject($id: uuid!) {\n      projects_by_pk(id: $id) {\n        id\n        name\n        description\n        metadata\n        skills_required\n        created_user\n      }\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation UpdateProject(\n      $id: uuid!\n      $name: String!\n      $description: String!\n      $skills_required: String = \"\"\n      $metadata: jsonb = \"\"\n      $created_user: uuid!\n    ) {\n      update_projects_by_pk(\n        pk_columns: { id: $id }\n        _set: {\n          name: $name\n          description: $description\n          skills_required: $skills_required\n          metadata: $metadata\n          created_user: $created_user\n        }\n      ) {\n        id\n        name\n        description\n        metadata\n        skills_required\n        created_user\n      }\n    }\n  "): (typeof documents)["\n    mutation UpdateProject(\n      $id: uuid!\n      $name: String!\n      $description: String!\n      $skills_required: String = \"\"\n      $metadata: jsonb = \"\"\n      $created_user: uuid!\n    ) {\n      update_projects_by_pk(\n        pk_columns: { id: $id }\n        _set: {\n          name: $name\n          description: $description\n          skills_required: $skills_required\n          metadata: $metadata\n          created_user: $created_user\n        }\n      ) {\n        id\n        name\n        description\n        metadata\n        skills_required\n        created_user\n      }\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation DeleteProject($id: uuid!) {\n      delete_projects_by_pk(id: $id) {\n        id\n      }\n    }\n  "): (typeof documents)["\n    mutation DeleteProject($id: uuid!) {\n      delete_projects_by_pk(id: $id) {\n        id\n      }\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query RecommendProjects(\n      $user_id: uuid!\n      $page_size: Int!\n      $page_number: Int!\n    ) {\n      recommend_projects(\n        args: {\n          user_id: $user_id\n          page_num: $page_number\n          page_size: $page_size\n        }\n      ) {\n        id\n        name\n        description\n        metadata\n        skills_required\n        created_user\n      }\n    }\n  "): (typeof documents)["\n    query RecommendProjects(\n      $user_id: uuid!\n      $page_size: Int!\n      $page_number: Int!\n    ) {\n      recommend_projects(\n        args: {\n          user_id: $user_id\n          page_num: $page_number\n          page_size: $page_size\n        }\n      ) {\n        id\n        name\n        description\n        metadata\n        skills_required\n        created_user\n      }\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query SearchProjects(\n      $search: String!\n      $skills: String = \"\"\n      $page_size: Int!\n      $page_number: Int!\n    ) {\n      search_projects(\n        args: {\n          search: $search\n          skills_filter: $skills\n          page_num: $page_number\n          page_size: $page_size\n        }\n      ) {\n        id\n        name\n        description\n        metadata\n        skills_required\n        created_user\n      }\n    }\n  "): (typeof documents)["\n    query SearchProjects(\n      $search: String!\n      $skills: String = \"\"\n      $page_size: Int!\n      $page_number: Int!\n    ) {\n      search_projects(\n        args: {\n          search: $search\n          skills_filter: $skills\n          page_num: $page_number\n          page_size: $page_size\n        }\n      ) {\n        id\n        name\n        description\n        metadata\n        skills_required\n        created_user\n      }\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation CreateUser(\n      $description: String = \"\"\n      $metadata: jsonb = \"\"\n      $name: String!\n      $skills: String = \"\"\n      $id: uuid!\n      $university: String = \"\"\n    ) {\n      insert_users_one(\n        object: {\n          description: $description\n          metadata: $metadata\n          name: $name\n          skills: $skills\n          id: $id\n          university: $university\n        }\n      ) {\n        description\n        id\n        metadata\n        name\n        skills\n        university\n      }\n    }\n  "): (typeof documents)["\n    mutation CreateUser(\n      $description: String = \"\"\n      $metadata: jsonb = \"\"\n      $name: String!\n      $skills: String = \"\"\n      $id: uuid!\n      $university: String = \"\"\n    ) {\n      insert_users_one(\n        object: {\n          description: $description\n          metadata: $metadata\n          name: $name\n          skills: $skills\n          id: $id\n          university: $university\n        }\n      ) {\n        description\n        id\n        metadata\n        name\n        skills\n        university\n      }\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetUser($id: uuid!) {\n      users_by_pk(id: $id) {\n        description\n        id\n        metadata\n        name\n        skills\n        university\n      }\n    }\n  "): (typeof documents)["\n    query GetUser($id: uuid!) {\n      users_by_pk(id: $id) {\n        description\n        id\n        metadata\n        name\n        skills\n        university\n      }\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation DeleteUser($id: uuid!) {\n      delete_users_by_pk(id: $id) {\n        id\n      }\n    }\n  "): (typeof documents)["\n    mutation DeleteUser($id: uuid!) {\n      delete_users_by_pk(id: $id) {\n        id\n      }\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation UpdateUser(\n      $description: String = \"\"\n      $metadata: jsonb = \"\"\n      $name: String = \"\"\n      $skills: String = \"\"\n      $id: uuid = \"\"\n      $university: String = \"\"\n    ) {\n      update_users_by_pk(\n        pk_columns: { id: $id }\n        _set: {\n          description: $description\n          metadata: $metadata\n          name: $name\n          skills: $skills\n          university: $university\n        }\n      ) {\n        description\n        id\n        metadata\n        name\n        skills\n        university\n      }\n    }\n  "): (typeof documents)["\n    mutation UpdateUser(\n      $description: String = \"\"\n      $metadata: jsonb = \"\"\n      $name: String = \"\"\n      $skills: String = \"\"\n      $id: uuid = \"\"\n      $university: String = \"\"\n    ) {\n      update_users_by_pk(\n        pk_columns: { id: $id }\n        _set: {\n          description: $description\n          metadata: $metadata\n          name: $name\n          skills: $skills\n          university: $university\n        }\n      ) {\n        description\n        id\n        metadata\n        name\n        skills\n        university\n      }\n    }\n  "];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;