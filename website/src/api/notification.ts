import { ApolloClient, gql } from "@apollo/client";
import { Notification } from "./types";
import { UUID } from "crypto";

export function createNotifcation(
  client: ApolloClient<any>,
  notification: Notification,
) {
  const mutation = gql`
    mutation CreateNotification($user_uuid: uuid!, $project_uuid: uuid!) {
      insert_notifications_one(
        object: { user_uuid: $user_uuid, project_uuid: $project_uuid }
      ) {
        id
        user_uuid
        project_uuid
      }
    }
  `;

  return client.mutate({
    mutation,
    variables: {
      user_id: notification.user_uuid,
      project_id: notification.project_uuid,
    },
  });
}

export function getNotification(client: ApolloClient<any>, id: UUID) {
  const query = gql`
    query GetNotification($id: uuid!) {
      notifications_by_pk(id: $id) {
        id
        user_uuid
        project_uuid
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
